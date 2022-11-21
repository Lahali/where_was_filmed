import up from "../media/up.svg";
import down from "../media/down.svg";
import NavigateButtons from "./NavigateButtons";
import { isEmpty } from "@firebase/util";
import '../style_Box.css'  // lo importo solo aqui de momento!
import { connectFirestoreEmulator } from "firebase/firestore";

export default function Box(props) {

  //funciones de activación de los botones
  const buttonAction = (action) => {
    let nextIndexEscena;
    let lengthArrayScenes = props.arrayScenes.length;
    let indexEscena = props.arrayScenes.findIndex(
      (escena) => escena.properties.scene_title === props.currentMarker.scene_title);
      if (action === "next") {
        if (indexEscena === lengthArrayScenes - 1) {
          nextIndexEscena = 0;
        } else {
          nextIndexEscena = indexEscena + 1;
        }
      } else {
        if (indexEscena === 0) {
          nextIndexEscena = lengthArrayScenes - 1;
        } else {
          nextIndexEscena = indexEscena - 1;
        }
      }
      
      props.setCurrentMarker({
        scene_title: props.arrayScenes[nextIndexEscena].properties.scene_title,
        movie_title: props.arrayScenes[nextIndexEscena].properties.movie_title,
        img: props.arrayScenes[nextIndexEscena].properties.img,
        coordinates: props.arrayScenes[nextIndexEscena].geometry.coordinates,
        index: nextIndexEscena,
      });
      props.map.flyTo(
        props.arrayScenes[nextIndexEscena].geometry.coordinates,
        this,
        { animate: true, duration: 1}
        );
      };

      function updateMapWhenResze(){
        let timing = 0;
        const interval = setInterval(updateMap, 10); // cada 10 milisegundos
        function updateMap() {
          props.map.invalidateSize();
          console.log('UPDATE! BOX')
          timing++;
          if (timing > 200) { // 100 veces 10 milisegundos son 1s
            clearInterval(interval);
          }}
      }

      // este handle activa que el puntero se centre en la transicion mientras se abre el box
      const handleClick = () => {
        props.boxPosition === "isOpen"? 
          props.setBoxPosition("isClose") :
          props.setBoxPosition("isOpen");
        updateMapWhenResze();
        };     

        // esto para elijir entre las tres clases del "box"
        const boxStyle = () => {
          if (isEmpty(props.currentMarker)) {
            console.log('isEmpty!!!!!!!!!!')
                      return 'boxHidden'
            } else if (props.boxPosition === "isOpen") {
              // console.log('boxOpen');
              return 'boxOpen'
            } else {
              // console.log('boxClosed');
              return 'boxClosed'
            }
          }
        
          return(
            <>
            <div className={boxStyle()}>
                  <div className="openCloseBox kdb"
                  onClick={handleClick}
                />


              <div className="p-2 mr-4 text-xl lg:text-2xl font-medium">
            {props.currentMarker.scene_title} 
          </div>
          <div className="p-2 mr-4 text-xs lg:text-2xl font-medium">
             {props.currentMarker.movie_title}
          </div>
            {/* <div className="p-4 absolute flex justify-between transform peer-checked:-translate-y-1/2 left-5 right-5 top-1/2">
              <svg
                onClick={() => buttonAction("previous")}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white lg:text-black md:text-black cursor-pointer"
                >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                  />
              </svg>

              <svg
                onClick={() => buttonAction("next")}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white lg:text-black md:text-black cursor-pointer"
                >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                  />
              </svg>
            </div> */}


                  {props.boxPosition==='isOpen' &&
                  <div className="imgContainer carousel-item relative w-full">
                      <img className=" object-cover w-full h-48" src={props.currentMarker.img} />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                       <button onClick={() => buttonAction("next")} className="btn-outline text-white bg-transparent">❮❮</button> 
                       <button onClick={() => buttonAction("next")} className="btn btn-circle">❯❯</button>
                    </div>
                  </div>
                  }
                  <label htmlFor="my-modal-6" className="link moreInfo">more info</label>

                <input type="checkbox" id="my-modal-6" className="modal-toggle" />

                <div className="modal modal-bottom sm:modal-middle">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
                    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                    
                    <div className="modal-action">
                      <label htmlFor="my-modal-6" className="link modalBox">close</label>
                    </div>
                  </div>
                </div>

                </div>
          </>
          )
          }


        /* return (
          <>
    <div className={boxStyle()}>
                  <div className="openCloseBox"
                  onClick={handleClick}
                />

              <div>

              </div>

              <div className="p-2 mr-4 text-xl lg:text-2xl font-medium">
            {props.currentMarker.scene_title} HOAL
          </div>
          <div className="p-2 mr-4 text-xs lg:text-2xl font-medium">
             {props.currentMarker.movie_title}
          </div>
          <div className="flex flex-col overflow-hidden items-center transition-all duration-1000 max-h-0 peer-checked:max-h-max">
            <div className="p-4 absolute flex justify-between transform peer-checked:-translate-y-1/2 left-5 right-5 top-1/2">
              <svg
                onClick={() => buttonAction("previous")}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white lg:text-black md:text-black cursor-pointer"
                >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                  />
              </svg>

              <svg
                onClick={() => buttonAction("next")}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white lg:text-black md:text-black cursor-pointer"
                >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                  />
              </svg>
            </div>


                  {props.boxPosition==='isOpen' &&
                  <div className="imgContainer">
                    <img className="imgScene" 
                    src={props.currentMarker.img} />
                  </div>}

                  <label htmlFor="my-modal-6" className="link">más</label>

                <input type="checkbox" id="my-modal-6" className="modal-toggle" />
                <div className="modal modal-bottom sm:modal-middle">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
                    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                    
                    <div className="modal-action">
                      <label htmlFor="my-modal-6" className="link">close</label>
                    </div>
                  </div>
                </div>

                </div>
                </div>
          </>
        ) */











      {/* {props.currentMarker.img && 
      (
        <div className="relative w-full overflow-hidden" onClick={handleClick}>
          <input
            className="peer absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer"
            type="checkbox"
            />



          <div className="p-2 mr-4 text-xl lg:text-2xl font-medium">
            {props.currentMarker.scene_title} 
          </div>
          <div className="p-2 mr-4 text-xs lg:text-2xl font-medium">
             {props.currentMarker.movie_title}
          </div>
          <div className="flex flex-col overflow-hidden items-center transition-all duration-1000 max-h-0 peer-checked:max-h-max">
            {/* la propiedad -translate tiene que estar dentro del peer-checked xq sino, salen los botones de navegación tb cuando la card está cerrada}
            <div className="p-4 absolute flex justify-between transform peer-checked:-translate-y-1/2 left-5 right-5 top-1/2">
              <svg
                onClick={() => buttonAction("previous")}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white lg:text-black md:text-black cursor-pointer"
                >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                  />
              </svg>

              <svg
                onClick={() => buttonAction("next")}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white lg:text-black md:text-black cursor-pointer"
                >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                  />
              </svg>
            </div>

            <div>
              <img src={props.currentMarker.img} />            
            </div>
          </div>
        </div>
      )}
    </>
  ); */}






  /* <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
  <a href="#slide3" className="btn btn-circle">❮</a> 
  <a href="#slide1" className="btn btn-circle">❯</a>
  </div> */









// animacion que sube y baja la card (mirar CSS)
// const mountedStyle = { animation: "inAnimation 1s" };
// const unmountedStyle = {
//   animation: "outAnimation 1s ",
//   animationFillMode: "forwards",
// };