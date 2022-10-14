import './Titlebar.css';

import minw10 from '@assets/icons/min-w-10.png';
import maxw10 from '@assets/icons/max-w-10.png';
import restorew10 from '@assets/icons/restore-w-10.png';
import closew10 from '@assets/icons/close-w-10.png';

import minw12 from '@assets/icons/min-w-12.png';
import maxw12 from '@assets/icons/max-w-12.png';
import restorew12 from '@assets/icons/restore-w-12.png';
import closew12 from '@assets/icons/close-w-12.png';

import minw15 from '@assets/icons/min-w-15.png';
import maxw15 from '@assets/icons/max-w-15.png';
import restorew15 from '@assets/icons/restore-w-15.png';
import closew15 from '@assets/icons/close-w-15.png';

import minw20 from '@assets/icons/min-w-20.png';
import maxw20 from '@assets/icons/max-w-20.png';
import restorew20 from '@assets/icons/restore-w-20.png';
import closew20 from '@assets/icons/close-w-20.png';

import minw24 from '@assets/icons/min-w-24.png';
import maxw24 from '@assets/icons/max-w-24.png';
import restorew24 from '@assets/icons/restore-w-24.png';
import closew24 from '@assets/icons/close-w-24.png';

import minw30 from '@assets/icons/min-w-30.png';
import maxw30 from '@assets/icons/max-w-30.png';
import restorew30 from '@assets/icons/restore-w-30.png';
import closew30 from '@assets/icons/close-w-30.png';

import context from '@src/main/window/titlebarContextApi';

function Titlebar() {
  return (
    <div id='titlebar'>
      <div id='drag-region'>
        <div id='window-title'>
          <span>EGalim Graph</span>
        </div>
        <div id='window-controls'>
          <div className='button' id='min-button' onClick={context.minimize}>
            <img
              className='icon'
              srcSet={`${minw10} 1x, ${minw12} 1.25x, ${minw15} 1.5x, ${minw15} 1.75x, ${minw20} 2x, ${minw20} 2.25x, ${minw24} 2.5x, ${minw30} 3x, ${minw30} 3.5x`}
              draggable='false'
            />
          </div>
          <div className='button' id='max-button' onClick={context.maximizeRestore}>
            <img
              className='icon'
              srcSet={`${maxw10} 1x, ${maxw12} 1.25x, ${maxw15} 1.5x, ${maxw15} 1.75x, ${maxw20} 2x, ${maxw20} 2.25x, ${maxw24} 2.5x, ${maxw30} 3x, ${maxw30} 3.5x`}
              draggable='false'
            />
          </div>
          <div className='button' id='restore-button' onClick={context.maximizeRestore}>
            <img
              className='icon'
              srcSet={`${restorew10} 1x, ${restorew12} 1.25x, ${restorew15} 1.5x, ${restorew15} 1.75x, ${restorew20} 2x, ${restorew20} 2.25x, ${restorew24} 2.5x, ${restorew30} 3x, ${restorew30} 3.5x`}
              draggable='false'
            />
          </div>
          <div className='button' id='close-button' onClick={context.close}>
            <img
              className='icon'
              srcSet={`${closew10} 1x, ${closew12} 1.25x, ${closew15} 1.5x, ${closew15} 1.75x, ${closew20} 2x, ${closew20} 2.25x, ${closew24} 2.5x, ${closew30} 3x, ${closew30} 3.5x`}
              draggable='false'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Titlebar;
