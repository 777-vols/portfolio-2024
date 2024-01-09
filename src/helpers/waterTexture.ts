import * as THREE from 'three';

const easeOutSine = (t: number, b: number, c: number, d: number) => {
  return c * Math.sin((t / d) * (Math.PI / 2)) + b;
};

const easeOutQuad = (t: number, b: number, c: number, d: number) => {
  t /= d;
  return -c * t * (t - 2) + b;
};

export class WaterTexture {
  private width: number;

  private height: number;

  private maxAge: number;

  private radius: number;

  private points: { x: number; y: number; age: number; force: number; vx: number; vy: number }[];

  private last: { x: number; y: number } | null;

  private canvas!: HTMLCanvasElement;

  private ctx!: CanvasRenderingContext2D;

  public texture!: THREE.Texture;

  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.maxAge = 65;
    this.radius = 30;
    this.points = [];
    this.last = null;

    this.initTexture();
  }

  private initTexture(): void {
    this.canvas = document.querySelector('canvas')!;
    this.canvas.width = window.innerWidth;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext('2d')!;
    this.texture = new THREE.Texture(this.canvas);
    this.clear();
  }

  private clear(): void {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public addPoint(point: { x: number; y: number }): void {
    let force = 0;
    let vx = 0;
    let vy = 0;

    const { last } = this;

    if (last) {
      const relativeX = point.x - last.x;
      const relativeY = point.y - last.y;

      const distanceSquared = relativeX * relativeX + relativeY * relativeY;
      const distance = Math.sqrt(distanceSquared);

      vx = relativeX / distance;
      vy = relativeY / distance;

      force = Math.min(distanceSquared * 10000, 1);
    }

    this.last = {
      x: point.x,
      y: point.y,
    };
    this.points.push({ x: point.x, y: point.y, age: 0, force, vx, vy });
  }

  public update(): void {
    this.clear();
    const agePart = 1 / this.maxAge;
    this.points.forEach((point, i) => {
      const slowAsOlder = 1 - point.age / this.maxAge;
      const force = point.force * agePart * slowAsOlder;

      point.x += point.vx * force;
      point.y += point.vy * force;
      point.age += 1;

      if (point.age > this.maxAge) {
        this.points.splice(i, 1);
      }
    });
    this.points.forEach((point) => {
      this.drawPoint(point);
    });
    this.texture.needsUpdate = true;
  }

  private drawPoint(point: {
    x: number;
    y: number;
    age: number;
    force: number;
    vx: number;
    vy: number;
  }): void {
    const pos = {
      x: point.x * this.width,
      y: point.y * this.height,
    };
    const { radius, ctx } = this;

    let intensity = 1;
    if (point.age < this.maxAge * 0.3) {
      intensity = easeOutSine(point.age / (this.maxAge * 0.3), 0, 1, 1);
    } else {
      intensity = easeOutQuad(1 - (point.age - this.maxAge * 0.3) / (this.maxAge * 0.7), 0, 1, 1);
    }
    intensity *= point.force;

    const red = ((point.vx + 1) / 2) * 255;
    const green = ((point.vy + 1) / 2) * 255;
    const blue = intensity * 255;
    const color = `${red}, ${green}, ${blue}`;

    const offset = this.width * 5;

    ctx.shadowOffsetX = offset;
    ctx.shadowOffsetY = offset;

    ctx.shadowColor = `rgba(${color},${0.7 * intensity})`;

    this.ctx.beginPath();
    this.ctx.fillStyle = 'rgba(255,0,0,1)';

    this.ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }
}
