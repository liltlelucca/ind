import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";


function CountryBorders() {

  const [countries, setCountries] = useState([]);


  useEffect(() => {

    fetch("https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson")
      .then((res) => res.json())
      .then((data) => {

        setCountries(data.features);

      });

  }, []);



  function convert(lat, lon, radius = 2.03) {

    const phi = (90 - lat) * Math.PI / 180;
    const theta = (lon + 180) * Math.PI / 180;


    return new THREE.Vector3(

      -radius * Math.sin(phi) * Math.cos(theta),

      radius * Math.cos(phi),

      radius * Math.sin(phi) * Math.sin(theta)

    );

  }



  return (

    <group>

      {
        countries.map((country, index) => {

          const geometry = country.geometry;


          if(!geometry) return null;


          let polygons = [];


          if(geometry.type === "Polygon") {

            polygons = geometry.coordinates;

          }


          if(geometry.type === "MultiPolygon") {

            polygons = geometry.coordinates.flat();

          }



          return polygons.map((polygon, i)=>{


            const points = polygon.map(([lon,lat]) =>

              convert(lat,lon)

            );


            return (

              <Line

                key={`${index}-${i}`}

                points={points}

                color="#00bdbd"

                lineWidth={0.5}

              />

            );


          });


        })
      }

    </group>

  );

}



function Sphere(){

  return (

    <mesh>

      <sphereGeometry
        args={[2,64,64]}
      />


      <meshStandardMaterial

        color="#002453"

        roughness={0.7}

        metalness={0.3}

      />

    </mesh>

  );

}



export default function Globe(){


  return (

  <Canvas
    style={{
        width: "100%",
        height: "100%"
    }}
    dpr={[1,2]}
    camera={{
        position:[0,0,6],
        fov:50
    }}
>


      <ambientLight intensity={2}/>


      <directionalLight

        position={[5,5,5]}

        intensity={2}

      />



      <Sphere/>


      <CountryBorders/>


      <OrbitControls/>

    </Canvas>

  );

}