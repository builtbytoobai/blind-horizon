import { Scene } from 'phaser';

const W = 1024;
const H = 768;

// North coast bottom edge — organic bumps, not a straight line
const NORTH_COAST = [
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
const SOUTH_COAST = [
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

const OBJECTIVES = [
    { x: 200, y: 140,    color: 0xf0c040, label: 'North Port'           },
    { x: 820, y: 638,    color: 0xf0c040, label: 'South Port'           },
    { x: 512, y: LANE_Y, color: 0x40d0f0, label: 'Central Sea Lane'     },
    { x: 490, y: 308,    color: 0xc070f0, label: 'Radar Island'         },
    { x: 760, y: 175,    color: 0xf06040, label: 'Coastal Missile Site' },
] as const;

const LEGEND = [
    { color: 0xf0c040, label: 'Port'         },
    { color: 0x40d0f0, label: 'Sea Lane'     },
    { color: 0xc070f0, label: 'Radar'        },
    { color: 0xf06040, label: 'Missile Site' },
] as const;

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    create() {
        const g = this.add.graphics();

        // ── Camera: deepest background colour ────────────────────────────────
        this.cameras.main.setBackgroundColor(0x080e18);

        // ── Ocean base ───────────────────────────────────────────────────────
        // Slightly lighter than camera BG so the ocean reads as a distinct plane
        g.fillStyle(0x0c1a2c);
        g.fillRect(0, 0, W, H);

        // ── Land masses ──────────────────────────────────────────────────────
        g.fillStyle(0x172215);
        g.fillPoints(
            [{ x: 0, y: 0 }, { x: W, y: 0 }, ...NORTH_COAST.slice().reverse()],
            true,
        );
        g.fillPoints(
            [...SOUTH_COAST, { x: W, y: H }, { x: 0, y: H }],
            true,
        );

        // Subtle terrain variation — break up the flat land fill with low-alpha patches
        g.fillStyle(0x1e2d18, 0.50);
        g.fillEllipse(310,  85, 420, 150);
        g.fillEllipse(690, 685, 400, 140);

        g.fillStyle(0x111a0c, 0.38);
        g.fillEllipse(760, 115, 310, 110);
        g.fillEllipse(210, 658, 340, 130);

        // ── Faction starting-area tints ──────────────────────────────────────
        g.fillStyle(0x1a4878, 0.16);
        g.fillRect(0, 0, 240, 230);
        g.fillStyle(0x781a1a, 0.16);
        g.fillRect(W - 240, 545, 240, H - 545);

        // ── Radar Island landmass ────────────────────────────────────────────
        g.fillStyle(0x1c2b19);
        g.fillEllipse(490, 308, 88, 44);

        // ── Grid overlay (behind all tactical elements) ──────────────────────
        const COLS = 10;
        const ROWS =  8;
        g.lineStyle(1, 0x2860a0, 0.05);
        for (let c = 1; c < COLS; c++) {
            g.lineBetween(c * W / COLS, 0, c * W / COLS, H);
        }
        for (let r = 1; r < ROWS; r++) {
            g.lineBetween(0, r * H / ROWS, W, r * H / ROWS);
        }

        // ── Coastline glow + main stroke ─────────────────────────────────────
        // Helper: draw segments for both coastlines
        const strokeCoasts = () => {
            for (let i = 0; i < NORTH_COAST.length - 1; i++) {
                g.lineBetween(
                    NORTH_COAST[i].x,     NORTH_COAST[i].y,
                    NORTH_COAST[i + 1].x, NORTH_COAST[i + 1].y,
                );
            }
            for (let i = 0; i < SOUTH_COAST.length - 1; i++) {
                g.lineBetween(
                    SOUTH_COAST[i].x,     SOUTH_COAST[i].y,
                    SOUTH_COAST[i + 1].x, SOUTH_COAST[i + 1].y,
                );
            }
        };

        g.lineStyle(16, 0x306050, 0.04); strokeCoasts();
        g.lineStyle( 8, 0x407860, 0.07); strokeCoasts();
        g.lineStyle( 4, 0x52a878, 0.12); strokeCoasts();
        g.lineStyle( 1.5, 0x88c8a0, 0.82); strokeCoasts();

        // Radar Island outline glow + stroke
        g.lineStyle(8, 0x407860, 0.07);
        g.strokeEllipse(490, 308, 88, 44);
        g.lineStyle(1.5, 0x88c8a0, 0.70);
        g.strokeEllipse(490, 308, 88, 44);

        // ── Central Sea Lane corridor ────────────────────────────────────────
        // Outer zone
        g.fillStyle(0x183e5a, 0.14);
        g.fillEllipse(512, LANE_Y, 930, 88);
        g.lineStyle(1, 0x326888, 0.22);
        g.strokeEllipse(512, LANE_Y, 930, 88);

        // Inner navigable corridor
        g.fillStyle(0x1e4870, 0.20);
        g.fillEllipse(512, LANE_Y, 760, 52);
        g.lineStyle(1, 0x4aa8cc, 0.38);
        g.strokeEllipse(512, LANE_Y, 760, 52);

        // Centre dashes — suggest a navigational route
        g.lineStyle(1.5, 0x68c8e4, 0.48);
        const DASH = 22;
        const GAP  = 16;
        for (let x = 52; x < 972; x += DASH + GAP) {
            g.lineBetween(x, LANE_Y, Math.min(x + DASH, 972), LANE_Y);
        }

        // ── Objective markers — tactical reticle style ───────────────────────
        for (const obj of OBJECTIVES) {
            // Outer halo
            g.lineStyle(10, obj.color, 0.07);
            g.strokeCircle(obj.x, obj.y, 36);

            // Scan ring
            g.lineStyle(1, obj.color, 0.38);
            g.strokeCircle(obj.x, obj.y, 27);

            // Main ring (cool white)
            g.lineStyle(2, 0xd4ecff, 0.80);
            g.strokeCircle(obj.x, obj.y, 20);

            // Filled core
            g.fillStyle(obj.color, 0.85);
            g.fillCircle(obj.x, obj.y, 11);

            // Bright centre dot
            g.fillStyle(0xffffff, 0.92);
            g.fillCircle(obj.x, obj.y, 3);

            // Crosshair ticks
            const inner = 23;
            const outer = 33;
            g.lineStyle(1.5, 0xd4ecff, 0.46);
            g.lineBetween(obj.x,       obj.y - inner, obj.x,       obj.y - outer);
            g.lineBetween(obj.x,       obj.y + inner, obj.x,       obj.y + outer);
            g.lineBetween(obj.x - inner, obj.y,       obj.x - outer, obj.y      );
            g.lineBetween(obj.x + inner, obj.y,       obj.x + outer, obj.y      );
        }

        // ── HQ markers ───────────────────────────────────────────────────────
        const drawHQ = (cx: number, cy: number, color: number, label: string) => {
            const s = 13;
            const pts = [
                { x: cx,     y: cy - s },
                { x: cx + s, y: cy     },
                { x: cx,     y: cy + s },
                { x: cx - s, y: cy     },
            ];
            g.lineStyle(10, color, 0.12);
            g.strokeCircle(cx, cy, s + 9);
            g.fillStyle(color, 0.90);
            g.fillPoints(pts, true);
            g.lineStyle(1.5, 0xc8e4ff, 0.85);
            g.strokePoints(pts, true);
            this.add.text(cx, cy + s + 6, label, {
                fontFamily:      'Courier New, monospace',
                fontSize:        '11px',
                color:           '#7aaccc',
                stroke:          '#04101c',
                strokeThickness: 4,
            }).setOrigin(0.5, 0);
        };

        drawHQ(105,  108, 0x3468c8, 'NORTH HQ');
        drawHQ(918,  678, 0xc83434, 'SOUTH HQ');

        // ── Vignette — edge darkening for atmosphere ──────────────────────────
        // Drawn after map elements so it darkens them near the canvas edge
        const VIG = [
            { w:  45, a: 0.22 },
            { w:  90, a: 0.12 },
            { w: 150, a: 0.07 },
            { w: 210, a: 0.04 },
        ];
        for (const v of VIG) {
            g.fillStyle(0x000000, v.a);
            g.fillRect(0,       0,       v.w,   H    );   // left
            g.fillRect(W - v.w, 0,       v.w,   H    );   // right
            g.fillRect(0,       0,       W,     v.w  );   // top
            g.fillRect(0,       H - v.w, W,     v.w  );   // bottom
        }

        // ── HUD frame and corner brackets ────────────────────────────────────
        // Drawn after vignette so they read clearly at canvas edges
        g.lineStyle(1, 0x1c4460, 0.55);
        g.strokeRect(2, 2, W - 4, H - 4);

        const B_LEN   = 26;
        const B_INSET = 12;
        g.lineStyle(1.5, 0x3888a8, 0.62);
        // top-left
        g.lineBetween(B_INSET,           B_INSET,           B_INSET + B_LEN,     B_INSET          );
        g.lineBetween(B_INSET,           B_INSET,           B_INSET,             B_INSET + B_LEN  );
        // top-right
        g.lineBetween(W - B_INSET,       B_INSET,           W - B_INSET - B_LEN, B_INSET          );
        g.lineBetween(W - B_INSET,       B_INSET,           W - B_INSET,         B_INSET + B_LEN  );
        // bottom-left
        g.lineBetween(B_INSET,           H - B_INSET,       B_INSET + B_LEN,     H - B_INSET      );
        g.lineBetween(B_INSET,           H - B_INSET,       B_INSET,             H - B_INSET - B_LEN);
        // bottom-right
        g.lineBetween(W - B_INSET,       H - B_INSET,       W - B_INSET - B_LEN, H - B_INSET      );
        g.lineBetween(W - B_INSET,       H - B_INSET,       W - B_INSET,         H - B_INSET - B_LEN);

        // Title underline — drawn after vignette so it sits cleanly on the dark header
        g.lineStyle(1, 0x286080, 0.50);
        g.lineBetween(W / 2 - 108, 43, W / 2 + 108, 43);

        // ── Text — always rendered above the graphics object ─────────────────

        // Objective labels
        for (const obj of OBJECTIVES) {
            const southHalf = obj.y > H / 2;
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

        // Terrain region labels (very subtle environmental context)
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
        this.add.text(W / 2, 13, 'STRAIT CONTROL', {
            fontFamily:      'Arial Black',
            fontSize:        '20px',
            color:           '#c0e0ff',
            stroke:          '#030c18',
            strokeThickness: 6,
        }).setOrigin(0.5, 0);

        // Legend
        const LEG_Y    = H - 20;
        const LEG_X0   = 48;
        const LEG_STEP = 130;

        for (let i = 0; i < LEGEND.length; i++) {
            const lx = LEG_X0 + i * LEG_STEP;
            g.fillStyle(LEGEND[i].color, 0.85);
            g.fillCircle(lx, LEG_Y, 6);
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
