import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router'
import { auth, provider } from "../firebase"
import { selectUserPhoto, selectUserName, setUserLogin, setSignOut } from '../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
export const Header = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const userName = useSelector(selectUserName)
    const userPhoto = useSelector(selectUserPhoto)

    useEffect(() =>{
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                dispatch(setUserLogin({
                    name: user.displayName,
                    emai: user.email,
                    photo: user.photoURL
                }))
                history.push('/')
            }
        })
            
     },[])
    const signIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                let user = result.user
                dispatch(setUserLogin({
                    name: user.displayName,
                    emai: user.email,
                    photo: user.photoURL
                }))
                history.push('/')
            }).catch((e) => {
                console.log(e)
            })
    }
    const signOut = () => {
        auth.signOut()
            .then(() => {
                dispatch(setSignOut())
                history.push('/login')
            })
    }

    return (
        <Nav>
            <Logo src="/images/logo.svg" />
            {
                !userName ?
                    (<LoginContainer>
                        <Login onClick={signIn}>Login</Login>
                    </LoginContainer>)
                    : (
                        <>
                            <NavMenu>
                                <a href="/">
                                    <img src="/images/home-icon.svg" alt="home" />
                                    <span>HOME</span>
                                </a>
                                <a href="/#">
                                    <img src="/images/search-icon.svg" alt="home" />
                                    <span>SEARCH</span>
                                </a>
                                <a href="/#">
                                    <img src="/images/watchlist-icon.svg" alt="home" />
                                    <span>WATCHLIST</span>
                                </a>
                                <a href="/#">
                                    <img src="/images/original-icon.svg" alt="home" />
                                    <span>ORIGINALS</span>
                                </a>
                                <a href="/#">
                                    <img src="/images/movie-icon.svg" alt="home" />
                                    <span>MOVIES</span>
                                </a>
                                <a href="/#">
                                    <img src="/images/series-icon.svg" alt="home" />
                                    <span>SERIES</span>
                                </a>
                            </NavMenu>
                            <UserImg
                                onClick={signOut}
                                src="https://i.pinimg.com/originals/c7/91/4f/c7914fe9d034a01769502de04c4a0e9b.jpg" />
                        </>
                    )
            }

        </Nav>
    )
}

export default Header

const Nav = styled.nav`
height:70px;
background: #090b13;
display:flex;
align-items:center;
padding:0 36px;
verflow-x:hidden;
`
const Logo = styled.img`
width:80px;


`
const NavMenu = styled.div`
display:flex;
flex:1;
margin-left:25px;
align-items:center;
a{
    text-decoration:none;
    color:white;
    display:flex;
    align-items:center;
    padding:0 12px;

    img{
        height:20px;
    }
    span{
        font-size:13px;
        letter-spacing:1.42px;
        position:relative;
        &:after{
            content:"";
            height:2px;
            background:white;
            position:absolute;
           
            left:0;
            right:0;
            bottom:-6px;
            opacity:0;
            transform-origin:left center;
            transition: all 250ms cubic-bezier(0.25,0.46,0.45,0.94) 0s;
            transform:scaleX(0);
        }
    }

    &:hover{
        span:after{
            transform:scaleX(1);
            opacity:1;
        }
    }
    
}
`

const UserImg = styled.img`
width:48px;
height:48px;
border-radius:50%;
cursor:pointer;
`
const Login = styled.div`
    border:1px solid #f9f9f9;
    padding: 8px 16px;
    border-radius:4px;
    letter-spacing:1.5px;
    text-transform:uppercase;
    background-color: rgba(0,0,0,0.6);
    transition: all 0.2s ease 0s;

    &:hover{
        background-color:#f9f9f9;
        color:black;
        border-color:transperant;
    }
`
const LoginContainer = styled.div`
    display:flex;
    flex:1;
    justify-content:flex-end;

`