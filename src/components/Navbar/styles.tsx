import React from "react";
import styled from 'styled-components';

const NavbarWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px 60px 20px 60px;
    max-height: 10%;

    .col-1 {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        text-align: center;
    }
    .col-2 {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        text-align: center;
    }

    .item {
        padding: 0% 15% 0% 15%;
        text-align: center;
    }

    .item span {
        font-size: 14px;
        font-weight: bold;
        text-decoration: none;
        display: block;
        position: relative;
        padding: 8px 0;
        cursor: pointer;
        word-spacing: 10px;
      }

    .item span::before{
        content: "";
        width: 100%;
        height: 1px;
        position: absolute;
        left: 0;
        bottom: 0;
        background: #000;
        transition: 0.5s transform ease;
        transform: scale3d(0,1,1);
        transform-origin: 0 50%;
      }
      .item span:hover::before{
        transform: scale3d(1,1,1);
        
      }

      .item-selected span::after {
        content: "";
        width: 100%;
        height: 1px;
        position: absolute;
        left: 0;
        bottom: 0;
        background: #ffffff;
      }

      .item-effect span::before{
        transform-origin: 50% 50%;
        background: white;
      }
`

export default NavbarWrapper