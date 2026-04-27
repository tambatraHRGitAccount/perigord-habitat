'use client';
import { useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function usePointerLock(enabled: boolean) {
  const { camera, gl } = useThree();
  const [isLocked, setIsLocked] = useState(false);
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const moveState = useRef({ forward: false, backward: false, left: false, right: false });

  useEffect(() => {
    if (!enabled) return;

    const canvas = gl.domElement;

    const onPointerLockChange = () => {
      setIsLocked(document.pointerLockElement === canvas);
    };

    const onPointerLockError = () => {
      console.error('Pointer lock error');
    };

    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW': case 'ArrowUp':    moveState.current.forward = true; break;
        case 'KeyS': case 'ArrowDown':  moveState.current.backward = true; break;
        case 'KeyA': case 'ArrowLeft':  moveState.current.left = true; break;
        case 'KeyD': case 'ArrowRight': moveState.current.right = true; break;
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW': case 'ArrowUp':    moveState.current.forward = false; break;
        case 'KeyS': case 'ArrowDown':  moveState.current.backward = false; break;
        case 'KeyA': case 'ArrowLeft':  moveState.current.left = false; break;
        case 'KeyD': case 'ArrowRight': moveState.current.right = false; break;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isLocked) return;

      const movementX = e.movementX || 0;
      const movementY = e.movementY || 0;

      camera.rotation.y -= movementX * 0.002;
      camera.rotation.x -= movementY * 0.002;
      camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));
    };

    document.addEventListener('pointerlockchange', onPointerLockChange);
    document.addEventListener('pointerlockerror', onPointerLockError);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('pointerlockchange', onPointerLockChange);
      document.removeEventListener('pointerlockerror', onPointerLockError);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [enabled, camera, gl, isLocked]);

  const requestPointerLock = () => {
    gl.domElement.requestPointerLock();
  };

  const exitPointerLock = () => {
    document.exitPointerLock();
  };

  return {
    isLocked,
    requestPointerLock,
    exitPointerLock,
    moveState: moveState.current,
    velocity: velocity.current,
    direction: direction.current,
  };
}
