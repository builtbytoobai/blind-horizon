import { Scene } from 'phaser';

// ── Types ─────────────────────────────────────────────────────────────────────

interface CoastPoint { x: number; y: number; }
interface Objective  { x: number; y: number; color: number; label: string; }
interface HQMarker   { x: number; y: number; color: number; label: string; }

// ── Map constants ─────────────────────────────────────────────────────────────

const MAP_W = 1024;
const MAP_H = 768;

// ── Scenario layout data ──────────────────────────────────────────────────────

// North coast bottom edge — organic bumps, not a straight line
const NORTH_COAST: CoastPoint[] = [
    { x: 0,    y: 222 },
    { x: 150,  y: 225 },
    { x: 280,  y: 232 },
    { x: 380,  y: 240 },
    { x: 512,  y: 238 },
    { x: 660,  y: 230 },
    { x: 820,  y: 225 },
    { x: 950,  y: 220 },
    { x: 1024, y: 222 },
];

// South coast top edge — cape bulges north near center to narrow the strait
const SOUTH_COAST: CoastPoint[] = [
    { x: 0,    y: 548 },
    { x: 120,  y: 543 },
    { x: 250,  y: 530 },
    { x: 370,  y: 515 },
    { x: 450,  y: 506 },
    { x: 512,  y: 503 },
    { x: 580,  y: 508 },
    { x: 680,  y: 525 },
    { x: 800,  y: 545 },
    { x: 950,  y: 551 },
    { x: 1024, y: 548 },
];

// Strait center at chokepoint: (238 + 503) / 2 = 370
const LANE_Y = 370;

const OBJECTIVES: Objective[] = [
    { x: 200, y: 140,    color: 0xf0c040, label: 'North Port'           },
    { x: 820, y: 638,    color: 0xf0c040, label: 'South Port'           },
    { x: 512, y: LANE_Y, color: 0x40d0f0, label: 'Central Sea Lane'     },
    { x: 490, y: 308,    color: 0xc070f0, label: 'Radar Island'         },
    { x: 760, y: 175,    color: 0xf06040, label: 'Coastal Missile Site' },
];

const HQ_MARKERS: HQMarker[] = [
    { x: 105, y: 108, color: 0x3468c8, label: 'NORTH HQ' },
    { x: 918, y: 678, color: 0xc83434, label: 'SOUTH HQ' },
];

const LEGEND: { color: number; label: string }[] = [
    { color: 0xf0c040, label: 'Port'         },
    { color: 0x40d0f0, label: 'Sea Lane'     },
    { color: 0xc070f0, label: 'Radar'        },
    { color: 0xf06040, label: 'Missile Site' },
];

// ── Scene ─────────────────────────────────────────────────────────────────────

export class Game extends Scene {
    private g!: Phaser.GameObjects.Graphics;

    constructor() {
        super('Game');
    }

    create() {
        this.g = this.add.graphics();
        this.cameras.main.setBackgroundColor(0x080e18);

        // Layer order matters — do not reorder
        this.drawOcean();
        this.drawLand();
        this.drawGrid();
        this.drawCoastlines();
        this.drawSeaLane();
        this.drawObjectiveMarkers();
        this.drawHQMarkers();
        this.drawVignette();
        this.drawHUDFrame();
        this.drawLabels();
    }

    // ── Private render methods ─────────────────────────────────────────────────

    private drawOcean(): void {
        this.g.fillStyle(0x0c1a2c);
        this.g.fillRect(0, 0, MAP_W, MAP_H);
    }

    private drawLand(): void {
        this.g.fillStyle(0x172215);
        this.g.fillPoints(
            [{ x: 0, y: 0 }, { x: MAP_W, y: 0 }, ...NORTH_COAST.slice().reverse()],
            true,
        );
        this.g.fillPoints(
            [...SOUTH_COAST, { x: MAP_W, y: MAP_H }, { x: 0, y: MAP_H }],
            true,
        );

        // Subtle terrain variation — break up the flat land fill with low-alpha patches
        this.g.fillStyle(0x1e2d18, 0.50);
        this.g.fillEllipse(310,  85, 420, 150);
        this.g.fillEllipse(690, 685, 400, 140);

        this.g.fillStyle(0x111a0c, 0.38);
        this.g.fillEllipse(760, 115, 310, 110);
        this.g.fillEllipse(210, 658, 340, 130);

        // Faction starting-area tints
        this.g.fillStyle(0x1a4878, 0.16);
        this.g.fillRect(0, 0, 240, 230);
        this.g.fillStyle(0x781a1a, 0.16);
        this.g.fillRect(MAP_W - 240, 545, 240, MAP_H - 545);

        // Radar Island landmass
        this.g.fillStyle(0x1c2b19);
        this.g.fillEllipse(490, 308, 88, 44);
    }

    private drawGrid(): void {
        const COLS = 10;
        const ROWS =  8;
        this.g.lineStyle(1, 0x2860a0, 0.05);
        for (let c = 1; c < COLS; c++) {
            this.g.lineBetween(c * MAP_W / COLS, 0, c * MAP_W / COLS, MAP_H);
        }
        for (let r = 1; r < ROWS; r++) {
            this.g.lineBetween(0, r * MAP_H / ROWS, MAP_W, r * MAP_H / ROWS);
        }
    }

    private drawCoastlines(): void {
        // Draw all segments for both coastlines in the current line style
        const strokeCoasts = () => {
            for (let i = 0; i < NORTH_COAST.length - 1; i++) {
                this.g.lineBetween(
                    NORTH_COAST[i].x,     NORTH_COAST[i].y,
                    NORTH_COAST[i + 1].x, NORTH_COAST[i + 1].y,
                );
            }
            for (let i = 0; i < SOUTH_COAST.length - 1; i++) {
                this.g.lineBetween(
                    SOUTH_COAST[i].x,     SOUTH_COAST[i].y,
                    SOUTH_COAST[i + 1].x, SOUTH_COAST[i + 1].y,
                );
            }
        };

        // Multi-pass glow then bright main stroke
        this.g.lineStyle(16, 0x306050, 0.04); strokeCoasts();
        this.g.lineStyle( 8, 0x407860, 0.07); strokeCoasts();
        this.g.lineStyle( 4, 0x52a878, 0.12); strokeCoasts();
        this.g.lineStyle(1.5, 0x88c8a0, 0.82); strokeCoasts();

        // Radar Island outline glow + stroke
        this.g.lineStyle(8, 0x407860, 0.07);
        this.g.strokeEllipse(490, 308, 88, 44);
        this.g.lineStyle(1.5, 0x88c8a0, 0.70);
        this.g.strokeEllipse(490, 308, 88, 44);
    }

    private drawSeaLane(): void {
        // Outer zone
        this.g.fillStyle(0x183e5a, 0.14);
        this.g.fillEllipse(512, LANE_Y, 930, 88);
        this.g.lineStyle(1, 0x326888, 0.22);
        this.g.strokeEllipse(512, LANE_Y, 930, 88);

        // Inner navigable corridor
        this.g.fillStyle(0x1e4870, 0.20);
        this.g.fillEllipse(512, LANE_Y, 760, 52);
        this.g.lineStyle(1, 0x4aa8cc, 0.38);
        this.g.strokeEllipse(512, LANE_Y, 760, 52);

        // Centre dashes — suggest a navigational route
        this.g.lineStyle(1.5, 0x68c8e4, 0.48);
        const DASH = 22;
        const GAP  = 16;
        for (let x = 52; x < 972; x += DASH + GAP) {
            this.g.lineBetween(x, LANE_Y, Math.min(x + DASH, 972), LANE_Y);
        }
    }

    private drawObjectiveMarkers(): void {
        for (const obj of OBJECTIVES) {
            // Outer halo
            this.g.lineStyle(10, obj.color, 0.07);
            this.g.strokeCircle(obj.x, obj.y, 36);

            // Scan ring
            this.g.lineStyle(1, obj.color, 0.38);
            this.g.strokeCircle(obj.x, obj.y, 27);

            // Main ring (cool white)
            this.g.lineStyle(2, 0xd4ecff, 0.80);
            this.g.strokeCircle(obj.x, obj.y, 20);

            // Filled core
            this.g.fillStyle(obj.color, 0.85);
            this.g.fillCircle(obj.x, obj.y, 11);

            // Bright centre dot
            this.g.fillStyle(0xffffff, 0.92);
            this.g.fillCircle(obj.x, obj.y, 3);

            // Crosshair ticks
            const inner = 23;
            const outer = 33;
            this.g.lineStyle(1.5, 0xd4ecff, 0.46);
            this.g.lineBetween(obj.x,         obj.y - inner, obj.x,         obj.y - outer);
            this.g.lineBetween(obj.x,         obj.y + inner, obj.x,         obj.y + outer);
            this.g.lineBetween(obj.x - inner, obj.y,         obj.x - outer, obj.y        );
            this.g.lineBetween(obj.x + inner, obj.y,         obj.x + outer, obj.y        );
        }
    }

    private drawHQMarkers(): void {
        for (const hq of HQ_MARKERS) {
            const s = 13;
            const pts = [
                { x: hq.x,     y: hq.y - s },
                { x: hq.x + s, y: hq.y     },
                { x: hq.x,     y: hq.y + s },
                { x: hq.x - s, y: hq.y     },
            ];
            this.g.lineStyle(10, hq.color, 0.12);
            this.g.strokeCircle(hq.x, hq.y, s + 9);
            this.g.fillStyle(hq.color, 0.90);
            this.g.fillPoints(pts, true);
            this.g.lineStyle(1.5, 0xc8e4ff, 0.85);
            this.g.strokePoints(pts, true);
            this.add.text(hq.x, hq.y + s + 6, hq.label, {
                fontFamily:      'Courier New, monospace',
                fontSize:        '11px',
                color:           '#7aaccc',
                stroke:          '#04101c',
                strokeThickness: 4,
            }).setOrigin(0.5, 0);
        }
    }

    private drawVignette(): void {
        const VIG = [
            { w:  45, a: 0.22 },
            { w:  90, a: 0.12 },
            { w: 150, a: 0.07 },
            { w: 210, a: 0.04 },
        ];
        for (const v of VIG) {
            this.g.fillStyle(0x000000, v.a);
            this.g.fillRect(0,             0,           v.w,   MAP_H        );  // left
            this.g.fillRect(MAP_W - v.w,   0,           v.w,   MAP_H        );  // right
            this.g.fillRect(0,             0,           MAP_W, v.w          );  // top
            this.g.fillRect(0,             MAP_H - v.w, MAP_W, v.w          );  // bottom
        }
    }

    private drawHUDFrame(): void {
        // Canvas border
        this.g.lineStyle(1, 0x1c4460, 0.55);
        this.g.strokeRect(2, 2, MAP_W - 4, MAP_H - 4);

        // Corner brackets
        const B_LEN   = 26;
        const B_INSET = 12;
        this.g.lineStyle(1.5, 0x3888a8, 0.62);
        // top-left
        this.g.lineBetween(B_INSET,           B_INSET,           B_INSET + B_LEN,         B_INSET            );
        this.g.lineBetween(B_INSET,           B_INSET,           B_INSET,                 B_INSET + B_LEN    );
        // top-right
        this.g.lineBetween(MAP_W - B_INSET,   B_INSET,           MAP_W - B_INSET - B_LEN, B_INSET            );
        this.g.lineBetween(MAP_W - B_INSET,   B_INSET,           MAP_W - B_INSET,         B_INSET + B_LEN    );
        // bottom-left
        this.g.lineBetween(B_INSET,           MAP_H - B_INSET,   B_INSET + B_LEN,         MAP_H - B_INSET    );
        this.g.lineBetween(B_INSET,           MAP_H - B_INSET,   B_INSET,                 MAP_H - B_INSET - B_LEN);
        // bottom-right
        this.g.lineBetween(MAP_W - B_INSET,   MAP_H - B_INSET,   MAP_W - B_INSET - B_LEN, MAP_H - B_INSET    );
        this.g.lineBetween(MAP_W - B_INSET,   MAP_H - B_INSET,   MAP_W - B_INSET,         MAP_H - B_INSET - B_LEN);

        // Title underline
        this.g.lineStyle(1, 0x286080, 0.50);
        this.g.lineBetween(MAP_W / 2 - 108, 43, MAP_W / 2 + 108, 43);
    }

    private drawLabels(): void {
        // Objective labels — flip above/below depending on which canvas half the marker is in
        for (const obj of OBJECTIVES) {
            const southHalf = obj.y > MAP_H / 2;
            this.add.text(obj.x, obj.y + (southHalf ? -38 : 38), obj.label, {
                fontFamily:      'Courier New, monospace',
                fontSize:        '12px',
                color:           '#aed4ec',
                stroke:          '#04101c',
                strokeThickness: 4,
                backgroundColor: 'rgba(4,12,24,0.82)',
                padding:         { x: 6, y: 3 },
            }).setOrigin(0.5, southHalf ? 1 : 0);
        }

        // Region labels (subtle environmental context)
        this.add.text(512,  98, 'NORTHERN COAST', {
            fontFamily:      'Arial',
            fontSize:        '11px',
            color:           '#3d6a4e',
            stroke:          '#06100a',
            strokeThickness: 3,
        }).setOrigin(0.5).setAlpha(0.55);

        this.add.text(512, 450, 'CENTRAL STRAIT', {
            fontFamily:      'Arial',
            fontSize:        '11px',
            color:           '#2e5c7a',
            stroke:          '#030c12',
            strokeThickness: 3,
        }).setOrigin(0.5).setAlpha(0.55);

        this.add.text(512, 660, 'SOUTHERN COAST', {
            fontFamily:      'Arial',
            fontSize:        '11px',
            color:           '#3d6a4e',
            stroke:          '#06100a',
            strokeThickness: 3,
        }).setOrigin(0.5).setAlpha(0.55);

        // Map title
        this.add.text(MAP_W / 2, 13, 'STRAIT CONTROL', {
            fontFamily:      'Arial Black',
            fontSize:        '20px',
            color:           '#c0e0ff',
            stroke:          '#030c18',
            strokeThickness: 6,
        }).setOrigin(0.5, 0);

        // Legend
        const LEG_Y    = MAP_H - 20;
        const LEG_X0   = 48;
        const LEG_STEP = 130;

        for (let i = 0; i < LEGEND.length; i++) {
            const lx = LEG_X0 + i * LEG_STEP;
            this.g.fillStyle(LEGEND[i].color, 0.85);
            this.g.fillCircle(lx, LEG_Y, 6);
            this.add.text(lx + 12, LEG_Y, LEGEND[i].label, {
                fontFamily:      'Courier New, monospace',
                fontSize:        '11px',
                color:           '#4c7898',
                stroke:          '#030c18',
                strokeThickness: 3,
            }).setOrigin(0, 0.5);
        }
    }
}
