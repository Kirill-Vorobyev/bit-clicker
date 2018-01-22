import React, {Component} from 'react';
import { instanceOf } from 'prop-types';
import { withCookies , Cookies } from 'react-cookie';
import Auxilary from '../hoc/Auxilary';
import TheButton from '../components/TheButton/TheButton';
import IdleUpgrade from '../components/Upgrades/Idle/IdleUpgrade';
import ActiveUpgrade from '../components/Upgrades/Active/ActiveUpgrade';
import Denom from '../hoc/Denom';
import classes from '../containers/Layout.css';

class Layout extends Component {
    
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };

    componentWillMount = () => {
        const gameVersion = '0.019';//change this when changing state to wipe everyones game data
        const defaultState = {
            version: gameVersion,
            count: 0,
            denom: 'bits',
            time: 0,
            idle: {
                toAdd: 0,
                timeout: 1000,
                nextCost: 64
            },
            active: {
                toAdd: 1,
                nextCost: 256
            },
            flyText: []
        }
        const { cookies } = this.props;
        const savedState = cookies.get('state');
        if(savedState === undefined || savedState.version !== gameVersion){
            this.setState(defaultState);
        }else{
            this.setState(savedState);
        }
    }

    updateCountHandler = (toAdd,click) => {
        this.setState( (prevState, props) => {
            // const newFlyText = [...prevState.flyText,toAdd];
            // console.log('beforeAdd:',prevState.flyText);

            // console.log('afterAdd:',newFlyText);
            return {
                count : parseInt(prevState.count) + toAdd,
                //flyText : newFlyText
            }
        }, () => {
            this.storeCookie();
        }
        );
    }

    idleUpgradeClickedHandler = () => {
        if(this.state.count >= this.state.idle.nextCost){
            this.setState( (prevState, props) => {
                let generating = parseInt(prevState.idle.toAdd) * (1000 / parseInt(prevState.idle.timeout));
                if(generating === 0){
                    generating = 1;
                }
                let newTimeout = parseInt(prevState.idle.timeout);
                let newToAdd = parseInt(prevState.idle.toAdd);
                let newNextCost = parseInt(prevState.idle.nextCost)*2;
                if(generating < 8){
                    if(newToAdd===0){//first buy
                        newToAdd=1;
                    }else{//buys up to 8 per sec
                        newTimeout = newTimeout/2;
                    }
                }else{//double income to add
                    newToAdd = newToAdd*2;
                }
                return {
                    count : parseInt(prevState.count) - parseInt(prevState.idle.nextCost),
                    idle: {
                        toAdd: newToAdd,
                        timeout: newTimeout,
                        nextCost: newNextCost
                    }
                }
            }, () => {
                this.storeCookie();
            }
            );
        }
        //console.log('Upgrade');
    }

    activeUpgradeClickedHandler = () => {
        if(this.state.count >= this.state.active.nextCost){
            this.setState( (prevState, props) => {
                return{
                    count : parseInt(prevState.count) - parseInt(prevState.active.nextCost),
                    active : {
                        toAdd: parseInt(prevState.active.toAdd) * 2,
                        nextCost: parseInt(prevState.active.nextCost) * 2
                    }
                }
            }, () => {
                this.storeCookie();
            })
        }
    }

    storeCookie = () => {
        const { cookies } = this.props;
        //cookies.set('count',inputCount,{ path: '/'});
        cookies.set('state',this.state,{ path: '/'});
    }

    toggleDenom = () => {
        this.setState((prevState,props) => {
            if(prevState.denom === 'bits'){
                return ({denom: 'bytes'});
            }else if(prevState.denom === 'bytes'){
                return ({denom: 'kbs'});
            }else if(prevState.denom === 'kbs'){
                return ({denom: 'mbs'});
            }else if(prevState.denom === 'mbs'){
                return ({denom: 'gbs'});
            }else if(prevState.denom === 'gbs'){
                return ({denom: 'bits'});
            }
        });
    }

    removeFlyText = () => {
        this.setState((prevState,props) => {
                let newFlyText = prevState.flyText;
                newFlyText.splice(0,1);
                console.log(newFlyText);
                return {flyText: [...newFlyText]}
        }, () => {
            this.storeCookie();
        });
    }

    render(){
        const count = this.state.count;
        // const addedFlyText = this.state.flyText.map((text,index)=>{
        //     console.log('created');
        //     return <FlyText text={text} key={Date.now()} callback={this.removeFlyText} />
        // });
        //this.storeCookie(count);
        return (
            <Auxilary>
                <div className={classes.counter}>
                <p className={classes.display}><Denom count={this.state.count} target={this.state.denom}/></p><p className={classes.denom} onClick={this.toggleDenom}>{this.state.denom}</p>
                </div>
                <TheButton clicked={() => this.updateCountHandler(this.state.active.toAdd,true)}/>
                <p className={classes.upgradesTitle}>Upgrades:</p>
                <ActiveUpgrade
                    toAdd={this.state.active.toAdd} 
                    nextCost={this.state.active.nextCost}
                    clicked={this.activeUpgradeClickedHandler}
                    count={this.state.count}
                    target={this.state.denom}
                />
                <IdleUpgrade 
                    toAdd={this.state.idle.toAdd} 
                    nextCost={this.state.idle.nextCost}
                    interval={this.state.idle.timeout}
                    count={this.state.count}
                    target={this.state.denom}
                    clicked={this.idleUpgradeClickedHandler}
                    callback={() => this.updateCountHandler(this.state.idle.toAdd,false)}
                />
            </Auxilary>
        );
    }
}

export default withCookies(Layout);