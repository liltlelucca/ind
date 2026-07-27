import { Html } from "@react-three/drei";
import * as THREE from "three";
import { useState } from "react";


const locations = [

  {
    name:"Paraná",
    lat:-25.42,
    lon:-49.27,
    description:"Matriz da Induslab e centro das operações."
  },

  {
    name:"São Paulo",
    lat:-22,
    lon:-44.63,
    description:"Unidade responsável pelo atendimento da região Sudeste."
  },

  {
    name:"Bahia",
    lat:-12.97,
    lon:-38.50,
    description:"Unidade de atendimento Nordeste."
  },

  {
    name:"Pernambuco",
    lat:-8.05,
    lon:-34.90,
    description:"Unidade estratégica para distribuição."
  },

  {
    name:"Flórida",
    lat:28.53,
    lon:-81.38,
    description:"Operação internacional da Induslab."
  }

];



function latLonToVector3(lat, lon, radius=2.05){

    const phi = (90-lat)*Math.PI/180;

    const theta = (lon+180)*Math.PI/180;


    return new THREE.Vector3(

        -radius*Math.sin(phi)*Math.cos(theta),

        radius*Math.cos(phi),

        radius*Math.sin(phi)*Math.sin(theta)

    );

}



function Marker({location, setSelected}){


    const position = latLonToVector3(
        location.lat,
        location.lon
    );


    return (

        <group position={position}>


            <mesh>

                <sphereGeometry args={[0.035,16,16]}/>

                <meshBasicMaterial color="#003ce0"/>

            </mesh>



            <Html
                position={[0,0.12,0]}
                center
                distanceFactor={8}
            >

                <div

                    onClick={() => setSelected(location)}

                    style={{

                        color:"#f7f7f7",

                        fontSize:"8px",

                        fontWeight:"400",

                        cursor:"pointer",

                        whiteSpace:"nowrap",

                        textShadow:
                        "0 0 10px black"

                    }}

                >

                    {location.name}

                </div>


            </Html>


        </group>

    );

}



function InfoCard({location, close}){

    return (

        <Html
            fullscreen
        >

            <div

                style={{

                    position:"fixed",

                    right:"40px",

                    top:"50%",

                    transform:"translateY(-50%)",

                    width:"300px",

                    padding:"25px",

                    borderRadius:"25px",

                    background:"rgba(255,255,255,.12)",

                    backdropFilter:"blur(20px)",

                    color:"white",

                    border:
                    "1px solid rgba(0, 26, 255, 0.5)"

                }}

            >

                <h2>

                    {location.name}

                </h2>


                <p style={{
                    marginTop:"15px"
                }}>

                    {location.description}

                </p>


                <button

                    onClick={close}

                    style={{

                        marginTop:"20px",

                        cursor:"pointer"

                    }}

                >

                    Fechar

                </button>


            </div>


        </Html>

    );

}



export default function Markers(){


    const [selected,setSelected] = useState(null);



    return (

        <>

            {
                locations.map(location=>(

                    <Marker

                        key={location.name}

                        location={location}

                        setSelected={setSelected}

                    />

                ))
            }



            {
                selected && (

                    <InfoCard

                        location={selected}

                        close={()=>setSelected(null)}

                    />

                )
            }


        </>

    );

}