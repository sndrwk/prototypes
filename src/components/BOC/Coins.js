import React, { useEffect, useRef } from "react";
import * as THREE from "three";

import Button from "../UI/Button";

import frontTexture from "../../assets/5front.png";
import backTexture from "../../assets/5back.png";

const Coins = (props) => {
  const coinRef = useRef();

  // set up threejs scene
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  const camera = new THREE.PerspectiveCamera(
    20,
    window.innerWidth / window.innerHeight,
    1,
    2000
  );
  camera.position.z = 1500;
  const scene = new THREE.Scene();
  const light = new THREE.PointLight(0xffffff, 1, 0, 1);
  light.position.set(0, 0, 600);
  scene.add(light);
  const coinWidth = window.innerWidth / 12;

  // create coin mesh
  class Coin extends THREE.Mesh {
    constructor(position) {
      // (bottomRadius, topRadius, height, segmentRadius, segmentHeight)
      const geometry = new THREE.CylinderGeometry(
        coinWidth,
        coinWidth,
        8,
        100,
        100,
        false
      );
      const material = [
        new THREE.MeshStandardMaterial({
          color: 0xbb9935,
        }),
        new THREE.MeshStandardMaterial({
          map: new THREE.TextureLoader().load(frontTexture),
        }),
        new THREE.MeshStandardMaterial({
          map: new THREE.TextureLoader().load(backTexture),
        }),
      ];
      super(geometry, material);

      this.overdraw = true;
      this.position.x = position;
      this.rotation.y = Math.PI / 2;
      this.rotation.x = Math.PI / 4;
    }
  }

  // add three coins to scene
  const coins = [];
  for (let i = -1; i < 2; i++) {
    let coin = new Coin(i * (coinWidth * 2.5));
    coins.push(coin);
    scene.add(coin);
  }

  // set animation configs
  const angularSpeed = 0.15;
  const g = 9.8;
  let lastTime = 0;
  let t = 0;
  let coinAnimation;
  let throwing = false;

  // recursive animation function
  const animate = () => {
    const time = new Date().getTime();
    const timeDiff = time - lastTime;
    const angleChange = (angularSpeed * timeDiff * 2 * Math.PI) / 100;
    lastTime = time;

    for (let coin of coins) {
      if (coin.position.y >= 0 && throwing) {
        coin.rotation.x += angleChange;
        coin.position.y = coin.v0 * t - (g * t * t) / 2;
      } else if (
        Math.abs((coin.rotation.x % Math.PI) - Math.PI / 2) > 0.1 &&
        throwing
      ) {
        coin.rotation.x += angleChange;
      } else if (throwing) {
        coin.throwing = false;
        if (!coins[0].throwing && !coins[1].throwing && !coins[2].throwing) {
          updateHex();
          throwing = false;
        }
      }
    }

    t += 0.2;

    renderer.render(scene, camera);
    coinAnimation = window.requestAnimationFrame(animate);
  };
  animate();

  // throw coins
  const throwCoins = () => {
    if (!throwing) {
      throwing = true;
    }
    throwing = true;
    for (let coin of coins) {
      t = 0;
      lastTime = 0;
      coin.v0 = (Math.random() * coinWidth) / 2 + coinWidth / 2;
      coin.position.y = 0;
      coin.throwing = true;
    }
  };

  // update hexagram once coins have landed
  const updateHex = () => {
    let heads = 0;
    for (let coin of coins) {
      if (Math.floor(coin.rotation.x / Math.PI) % 2 === 0) {
        heads++;
      }
    }
    props.onThrow(heads);
  };

  useEffect(() => {
    coinRef.current.appendChild(renderer.domElement);
    return () => {
      window.cancelAnimationFrame(coinAnimation);
    };
  }, [renderer.domElement, coinAnimation]);

  return (
    <div>
      <div ref={coinRef}></div>
      <Button className="boc-button" onClick={throwCoins}>
        THROW
      </Button>
    </div>
  );
};

export default React.memo(Coins);
