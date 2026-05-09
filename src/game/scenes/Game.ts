import { Scene } from 'phaser';

const NORTH_LAND_BOTTOM = 220;
const SOUTH_LAND_TOP    = 548;

const OBJECTIVES = [
    { x: 200, y: 145, color: 0xf0c040, label: 'North Port'           },
    { x: 820, y: 635, color: 0xf0c040, label: 'South Port'           },
    { x: 512, y: 460, color: 0x40d0f0, label: 'Central Sea Lane'     },
    { x: 512, y: 308, color: 0xc070f0, label: 'Radar Island'         },
    { x: 760, y: 182, color: 0xf06040, label: 'Coastal Missile Site' },
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
        const W = 1024;
        const H = 768;
        const g = this.add.graphics();

        // Landmasses
        g.fillStyle(0x4a5e3a);
        g.fillRect(0, 0, W, NORTH_LAND_BOTTOM);
        g.fillRect(0, SOUTH_LAND_TOP, W, H - SOUTH_LAND_TOP);

        // Starting area tints (blue = north player, red = south player)
        g.fillStyle(0x5080cc, 0.2);
        g.fillRect(0, 0, 210, NORTH_LAND_BOTTOM);
        g.fillStyle(0xcc5050, 0.2);
        g.fillRect(W - 210, SOUTH_LAND_TOP, 210, H - SOUTH_LAND_TOP);

        // Radar Island — small landmass in upper strait
        g.fillStyle(0x5a6e4a);
        g.fillEllipse(512, 308, 104, 56);

        // Coastline edges
        g.lineStyle(2, 0x7a9a5a, 0.9);
        g.lineBetween(0, NORTH_LAND_BOTTOM, W, NORTH_LAND_BOTTOM);
        g.lineBetween(0, SOUTH_LAND_TOP,    W, SOUTH_LAND_TOP);

        // Objective markers
        for (const obj of OBJECTIVES) {
            g.lineStyle(3, 0xffffff, 0.85);
            g.strokeCircle(obj.x, obj.y, 20);
            g.fillStyle(obj.color, 0.9);
            g.fillCircle(obj.x, obj.y, 15);
        }

        // Objective labels
        for (const obj of OBJECTIVES) {
            this.add.text(obj.x, obj.y + 28, obj.label, {
                fontFamily: 'Arial',
                fontSize: '13px',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 4,
            }).setOrigin(0.5, 0);
        }

        // Terrain region labels (subtle, behind objectives)
        this.add.text(512, 95, 'NORTHERN COAST', {
            fontFamily: 'Arial',
            fontSize: '13px',
            color: '#c8d8b0',
            stroke: '#1a2810',
            strokeThickness: 3,
        }).setOrigin(0.5).setAlpha(0.5);

        this.add.text(512, 388, 'CENTRAL STRAIT', {
            fontFamily: 'Arial',
            fontSize: '13px',
            color: '#90bcd8',
            stroke: '#0a1820',
            strokeThickness: 3,
        }).setOrigin(0.5).setAlpha(0.5);

        this.add.text(512, 658, 'SOUTHERN COAST', {
            fontFamily: 'Arial',
            fontSize: '13px',
            color: '#c8d8b0',
            stroke: '#1a2810',
            strokeThickness: 3,
        }).setOrigin(0.5).setAlpha(0.5);

        // Map title
        this.add.text(W / 2, 12, 'STRAIT CONTROL', {
            fontFamily: 'Arial Black',
            fontSize: '22px',
            color: '#e8eef8',
            stroke: '#0a1420',
            strokeThickness: 6,
        }).setOrigin(0.5, 0);

        // Legend
        const legendY   = H - 22;
        const legendX0  = 50;
        const legendStep = 130;

        for (let i = 0; i < LEGEND.length; i++) {
            const lx = legendX0 + i * legendStep;
            g.fillStyle(LEGEND[i].color, 1);
            g.fillCircle(lx, legendY, 7);
            this.add.text(lx + 14, legendY, LEGEND[i].label, {
                fontFamily: 'Arial',
                fontSize: '12px',
                color: '#b8c8d8',
                stroke: '#000000',
                strokeThickness: 3,
            }).setOrigin(0, 0.5);
        }
    }
}
