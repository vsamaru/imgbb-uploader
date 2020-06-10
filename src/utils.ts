import {useEffect,useCallback,useRef,useState} from 'react'

export const print = process.env.NODE_ENV === 'production' ? (...args)=>{} : console.log;

export function makeid(length=4) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

export function timeAgo(previous:Date) {
    const current = new Date();

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current.getMilliseconds() - previous.getMilliseconds();

    const s = (d) => d > 1 ? "s" : '';
    if (elapsed < msPerMinute) {
        return 'just now';
        //const d = Math.round(elapsed/1000)
        //return  d + ` second${s(d)} ago`;   
    }

    else if (elapsed < msPerHour) {
        const d = Math.round(elapsed/msPerMinute);
        return d + ` minute${s(d)} ago`;   
    }

    else if (elapsed < msPerDay ) {
        const d = Math.round(elapsed/msPerHour );
         return Math.round(elapsed/msPerHour ) + ` hour${s(d)} ago`;   
    }

    else if (elapsed < msPerMonth) {
        const d = Math.round(elapsed/msPerDay)
        return d + ` day${s(d)} ago`;   
    }

    else if (elapsed < msPerYear) {
        const d = Math.round(elapsed/msPerMonth);
        return d + ` month${s(d)} ago`;   
    }

    else {
        const d = Math.round(elapsed/msPerYear);
        return d + ` year${s(d)} ago`;   
    }
}


export function useStateObj<S>(
    initialValue: S | (() => S)
  ): [S, (s:Partial<S>) => void, { current: S }, (s: S) => void] {
    const [state, setState] = useState<S>(initialValue);
    const stateRef = useRef(state);
    useEffect(() => {
      stateRef.current = state;
    }, [state]);
    const updateState = useCallback((x:Partial<S>)=>{
      setState({...stateRef.current,...x});
    }, [state])
    return [state,  updateState, stateRef,setState, ];
  }