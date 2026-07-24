'use client';

import { useEffect, useRef, useCallback } from 'react';
import { Renderer, Program, Mesh, Triangle, Camera } from 'ogl';
import { cn } from '@/lib/cn';
import styles from './Galaxy.module.css';

const DPR_CAP_DESKTOP = 1.5;
const DPR_CAP_MOBILE = 1.25;
const MOBILE_BREAKPOINT = 768;
const STAR_LAYERS = 4;

const vertexShader = `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uMouse;
  uniform float uStarSpeed;
  uniform float uDensity;
  uniform float uHueShift;
  uniform float uSpeed;
  uniform float uGlowIntensity;
  uniform float uSaturation;
  uniform float uRepulsionStrength;
  uniform float uTwinkleIntensity;
  uniform float uRotationSpeed;
  uniform float uAspect;

  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }

  mat2 rot2(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
  }

  float starLayer(vec2 uv, float density, float time, float seed) {
    float result = 0.0;
    float scale = density * 28.0;
    vec2 grid = uv * scale;
    vec2 id = floor(grid);
    vec2 gv = fract(grid) - 0.5;
    float h = hash(id + seed);
    if (h < 0.28) {
      float brightness = hash(id + seed + 0.7) * 0.65 + 0.35;
      float phase = hash(id + seed + 1.3) * 6.2832;
      float twinkle = sin(time * uSpeed * (0.35 + brightness * 0.7) + phase);
      twinkle = twinkle * 0.5 + 0.5;
      brightness *= mix(1.0, twinkle, uTwinkleIntensity);
      float d = length(gv);
      float radius = 0.012 + hash(id + seed + 2.1) * 0.022;
      result += brightness * smoothstep(radius, 0.0, d);
    }
    return result;
  }

  void main() {
    vec2 uv = vUv - 0.5;
    uv.x *= uAspect;
    if (uRepulsionStrength > 0.0 && uMouse.x >= 0.0) {
      vec2 mp = uMouse - 0.5;
      mp.x *= uAspect;
      vec2 diff = uv - mp;
      float dist = length(diff);
      float force = uRepulsionStrength * 0.005 / (dist * dist + 0.04);
      uv += normalize(diff + 0.0001) * force;
    }
    uv = rot2(uTime * uRotationSpeed * 0.12) * uv;
    float stars = 0.0;
    for (int i = 0; i < ${STAR_LAYERS}; i++) {
      float fi = float(i);
      vec2 layerUv = uv;
      float spd = uStarSpeed * (0.35 + fi * 0.18);
      layerUv += vec2(uTime * spd * 0.011, uTime * spd * 0.005);
      layerUv = rot2(fi * 0.35) * layerUv;
      stars += starLayer(layerUv, uDensity * (1.0 + fi * 0.22), uTime, fi * 13.7);
    }
    vec3 starColor = hsv2rgb(vec3(uHueShift / 360.0, uSaturation, 1.0));
    float cd = length(vUv - 0.5);
    float glow = exp(-cd * cd * 3.2) * uGlowIntensity;
    vec3 glowColor = hsv2rgb(vec3((uHueShift + 35.0) / 360.0, uSaturation * 0.25, 1.0));
    vec3 color = vec3(0.009, 0.009, 0.022);
    color += stars * starColor * 0.55;
    color += glow * glowColor * 0.28;
    color *= 1.0 - cd * 0.35;
    gl_FragColor = vec4(color, 1.0);
  }
`;

export interface GalaxyProps {
  starSpeed?: number;
  density?: number;
  hueShift?: number;
  speed?: number;
  glowIntensity?: number;
  saturation?: number;
  mouseRepulsion?: boolean;
  repulsionStrength?: number;
  twinkleIntensity?: number;
  rotationSpeed?: number;
  transparent?: boolean;
  className?: string;
}

export function Galaxy({
  starSpeed = 0.5,
  density = 1.9,
  hueShift = 135,
  speed = 1.6,
  glowIntensity = 0.55,
  saturation = 0,
  mouseRepulsion = true,
  repulsionStrength = 2,
  twinkleIntensity = 0.3,
  rotationSpeed = 0.1,
  transparent = true,
  className,
}: GalaxyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const rendererRef = useRef<Renderer | null>(null);
  const meshRef = useRef<Mesh | null>(null);
  const programRef = useRef<Program | null>(null);
  const rafRef = useRef(0);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1, y: -1 });
  const startTimeRef = useRef(0);
  const isVisibleRef = useRef(true);
  const isTouchDevice = useRef(false);

  useEffect(() => {
    isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }, []);

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!mouseRepulsion || isTouchDevice.current) return;
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!inside) {
        mouseRef.current = { x: -1, y: -1 };
        return;
      }
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: 1.0 - (e.clientY - rect.top) / rect.height,
      };
    },
    [mouseRepulsion],
  );

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? DPR_CAP_MOBILE : DPR_CAP_DESKTOP);

    const rect = container.getBoundingClientRect();
    const cssWidth = Math.max(rect.width, 1);
    const cssHeight = Math.max(rect.height, 1);

    const renderer = new Renderer({
      canvas,
      width: cssWidth,
      height: cssHeight,
      dpr,
      alpha: transparent,
      premultipliedAlpha: transparent,
      antialias: !isMobile,
      webgl: 2,
    });
    rendererRef.current = renderer;

    const gl = renderer.gl;
    if (!gl) {
      canvas.style.background = 'radial-gradient(ellipse at 50% 40%, rgba(20, 28, 50, 0.7), rgba(9, 9, 11, 0.95))';
      return;
    }

    gl.clearColor(0.012, 0.012, 0.031, 1.0);

    const geometry = new Triangle(gl);
    const mobileDensity = isMobile ? density * 0.6 : density;
    const useRepulsion = mouseRepulsion && !isTouchDevice.current;

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      transparent,
      uniforms: {
        uTime:             { value: 0 },
        uResolution:       { value: [cssWidth * dpr, cssHeight * dpr] },
        uMouse:            { value: [-1, -1] },
        uStarSpeed:        { value: starSpeed },
        uDensity:          { value: mobileDensity },
        uHueShift:         { value: hueShift },
        uSpeed:            { value: speed },
        uGlowIntensity:    { value: glowIntensity },
        uSaturation:       { value: saturation },
        uRepulsionStrength:{ value: useRepulsion ? repulsionStrength : 0 },
        uTwinkleIntensity: { value: twinkleIntensity },
        uRotationSpeed:    { value: rotationSpeed },
        uAspect:           { value: cssWidth / Math.max(cssHeight, 1) },
      },
    });
    programRef.current = program;

    const camera = new Camera(gl, { aspect: cssWidth / Math.max(cssHeight, 1) });
    const mesh = new Mesh(gl, { geometry, program });
    meshRef.current = mesh;

    startTimeRef.current = Date.now();

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const applyReduced = () => {
      if (motionQuery.matches) {
        program.uniforms.uSpeed.value = 0;
        program.uniforms.uRotationSpeed.value = 0;
        program.uniforms.uTwinkleIntensity.value = 0;
        program.uniforms.uStarSpeed.value = 0;
      } else {
        program.uniforms.uSpeed.value = speed;
        program.uniforms.uRotationSpeed.value = rotationSpeed;
        program.uniforms.uTwinkleIntensity.value = twinkleIntensity;
        program.uniforms.uStarSpeed.value = starSpeed;
      }
    };
    applyReduced();

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      if (!isVisibleRef.current) return;
      if (!programRef.current || !rendererRef.current || !meshRef.current) return;
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      programRef.current.uniforms.uTime.value = elapsed;
      programRef.current.uniforms.uMouse.value = [mouseRef.current.x, mouseRef.current.y];
      rendererRef.current.render({ scene: meshRef.current, camera });
    };
    rafRef.current = requestAnimationFrame(animate);

    if (useRepulsion) {
      window.addEventListener('pointermove', handlePointerMove);
    }

    motionQuery.addEventListener('change', applyReduced);

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w < 1 || h < 1) continue;
        renderer.setSize(w, h);
        if (programRef.current) {
          programRef.current.uniforms.uResolution.value = [w * dpr, h * dpr];
          programRef.current.uniforms.uAspect.value = w / Math.max(h, 1);
        }
        if (camera) {
          if (camera) { camera.aspect = w / Math.max(h, 1); }
        }
      }
    });
    ro.observe(container);

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (useRepulsion) {
        window.removeEventListener('pointermove', handlePointerMove);
      }
      motionQuery.removeEventListener('change', applyReduced);
      ro.disconnect();
      const loseCtx = gl.getExtension('WEBGL_lose_context');
      loseCtx?.loseContext();
      rendererRef.current = null;
      programRef.current = null;
    };
  }, [
    starSpeed,
    density,
    hueShift,
    speed,
    glowIntensity,
    saturation,
    mouseRepulsion,
    repulsionStrength,
    twinkleIntensity,
    rotationSpeed,
    transparent,
    handlePointerMove,
  ]);

  return (
    <div ref={containerRef} className={cn(styles.container, className)}>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
    </div>
  );
}
