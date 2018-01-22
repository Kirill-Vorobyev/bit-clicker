import thousands from 'thousands';

const denom = (props) => {
    let input = props.count;
    let target = props.target;
    //console.log(input , target);
    switch (target) {
        case ('bits'):
            return thousands(input);
            break;
        case ('bytes'):
            return thousands(input / 8);
            break;
        case ('kbs'):
            return thousands(input / (8 * Math.pow(2,10)));
            break;
        case ('mbs'):
            return thousands(input / (8 * Math.pow(2,20)));
            break;
        case ('gbs'):
            return thousands(input / (8 * Math.pow(2,30)));
            break;
        default:
            return thousands(input);
            break;
    }
}

export default denom;

