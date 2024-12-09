import { Stage, Graphics, Sprite } from '@pixi/react';
import { Application, Graphics as PixiGraphics, ICanvas } from 'pixi.js';
import { useCallback, useEffect, useState } from 'react';
import useMobile from '../hooks/isMobile';
import { LandMap, Coord } from '../api/interface';

export default function OrderMap({ map, currentPoint, fullPath }: { map: LandMap, currentPoint: Coord, fullPath: Coord[] }) {
    const isMobile = useMobile()
    const [app, setApp] = useState<Application<ICanvas>>();

    const coordMultiplier = isMobile ? 0.5 : 1

    useEffect(() => {
        app?.renderer.render(app.stage)
    }, [isMobile])


    const draw = useCallback((g: PixiGraphics) => {
        g.clear();
        g.lineStyle(2, 0xffd900, 1);
        map.roads.map(road => {
            let first = true
            road.points.map(point => {
                if (first) {
                    g.moveTo(point.lat * coordMultiplier, point.lon * coordMultiplier);

                    first = false
                } else {
                    g.lineTo(point.lat * coordMultiplier, point.lon * coordMultiplier);
                }
            })
        })
        map.crossRoads.map(crossRoad => {
            g.beginFill()
            g.drawCircle(crossRoad.point.lat * coordMultiplier, crossRoad.point.lon * coordMultiplier, 3 * coordMultiplier)
            g.endFill()
        })
        g.lineStyle(2, 0x00d9ff, 1);

        let first = true
        fullPath.map(point => {
            if (first) {
                g.moveTo(point.lat * coordMultiplier, point.lon * coordMultiplier);

                first = false
            } else {
                g.lineTo(point.lat * coordMultiplier, point.lon * coordMultiplier);
            }
        })

        g.beginFill(0x00d9ff)
        // g.drawCircle(currentPoint.lat, currentPoint.lon, 3)
        g.endFill()

    }, [map, fullPath, isMobile]);

    const drawTriangle = useCallback((g: PixiGraphics) => {
        g.clear();
        const currentPointI = fullPath.findIndex((x) => x.lat == currentPoint.lat && x.lon == currentPoint.lon)
        let first = currentPointI - 1
        let second = currentPointI
        if (currentPointI == 0) {
            first = currentPointI
            second = currentPointI + 1
        }
        const x1 = fullPath[first].lat
        const y1 = fullPath[first].lon
        const x2 = fullPath[second].lat
        const y2 = fullPath[second].lon
        //const k = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) / 100
        const k = 0.2
        const xl = x2 + (x1 - x2) * k - (y1 - y2) * k * ((Math.sqrt(3)) / (3))
        const yl = y2 + (y1 - y2) * k + (x1 - x2) * k * ((Math.sqrt(3)) / (3))
        const xr = x2 + (x1 - x2) * k + (y1 - y2) * k * ((Math.sqrt(3)) / (3))
        const yr = y2 + (y1 - y2) * k - (x1 - x2) * k * ((Math.sqrt(3)) / (3))
        g.beginFill(0x00d9ff)
        g.drawPolygon([
            x2 * coordMultiplier, y2 * coordMultiplier,
            xl * coordMultiplier, yl * coordMultiplier,
            xr * coordMultiplier, yr * coordMultiplier
        ])
        g.endFill()

    }, [fullPath, currentPoint, isMobile])

    const backgroundUrl = "/img/map.jpg"
    const backgroundPicWidth = 1600
    const backgroundPicHeight = 900
    const scaleFactor = isMobile ? 0.2 : 0.4
    return (
        <Stage width={backgroundPicWidth * scaleFactor} height={backgroundPicHeight * scaleFactor}
            raf={false}
            onMount={setApp}
        >
            <Sprite
                image={backgroundUrl}
                x={0}
                y={0}
                scale={scaleFactor}
            />
            <Graphics draw={draw} />
            {currentPoint.lat == -1 ? <></> : <Graphics draw={drawTriangle} />}
        </Stage >
    );
}
