import type { ButtonProps } from "../types/uiTypes";
import Objects from "../hook/Objects";


function Buttons({button, variant,...props}: ButtonProps & {type?: string}) {

  const{btnUniversal} = Objects();

  const filterredButtons = variant
  ? btnUniversal.filter((btn) => btn.type === variant)
  : btnUniversal;
  
  return (

    <>
      {filterredButtons.map((btn, i) => {
        const Content = btn.content;

        return (
          <button 
            key={i}
            {...props}
            className="bg-amber-400 w-44 h-10 rounded-3xl cursor-pointer font-['Open_Sans'] text-neutral-50"
            onClick={() =>console.log('ok')}
          >
            {typeof Content === 'string' ? Content : <Content />}
          </button>
        );
      })}        
    </>
  )
}
// teste
export default Buttons