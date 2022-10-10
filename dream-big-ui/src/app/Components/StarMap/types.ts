

export interface CircleSprite {
    id: number
    size: number
    circle: CircleData
    circlePath: paper.Path
    // imageId: number
    // imageRaster: paper.Raster
}

export interface Star extends CircleSprite {
    name: string
}

export interface Planet extends CircleSprite {
    offset: paper.Point
    orbitCircle: CircleData
    name: string
}

export interface CircleData {
    center: paper.Point
    radius: number
    fillColour: string
    strokeColour: string
    strokeWidth: number
}


export interface StarSystem {
    id: number
    name: string
    status: string
    star: Star
    planets: Planet[]
}
