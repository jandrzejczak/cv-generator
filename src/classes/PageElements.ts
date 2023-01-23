import { BaseElementDataType } from '../types/elementTypes'

export class LayoutElement {
  x: number
  y: number
  w: number
  h: number
  i: number
  resizable: boolean
  type: string
  data?: BaseElementDataType = {
    header: 'Heading...',
    text: 'Lorem ipsum...',
    date: 'Jan 2021 - Sep 2022',
  }
  constructor(
    x: number = 0,
    y: number = 0,
    w: number = 2,
    h: number = 2,
    i: number,
    resizable: boolean,
    type: string
  ) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.i = i
    this.resizable = resizable
    this.type = type
  }
}

export const layoutElementTypes = {
  headerElement: {
    w: 12,
    h: 3,
    resizable: false,
    type: 'HeaderElement',
    name: 'Header',
  },
  simpleTextElement: {
    w: 3,
    h: 10,
    resizable: true,
    type: 'SimpleTextElement',
    name: 'Simple text'
  },
  horizontalSpacer: {
    w: 3,
    h: 1,
    resizable: true,
    type: 'HorizontalSpacer',
    name: 'Horizontal spacer'
  },
  verticalSpacer: {
    w: 1,
    h: 3,
    resizable: true,
    type: 'VerticalSpacer',
    name: 'Vertical spacer'
  },
  bulletTextElement: {
    w: 6,
    h: 3,
    resizable: true,
    type: 'BulletTextElement',
    name: 'Bullet text'
  },
}

