/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable import/prefer-default-export */
import React from 'react'

export const onRenderBody = ({ setPostBodyComponents }) => {
  
  setPostBodyComponents([
    <script 
      src="https://kit.fontawesome.com/456fa9b7f3.js" 
      crossOrigin="anonymous" />,
    <script 
      src="https://code.jquery.com/jquery-3.2.1.slim.min.js" 
      integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" 
      crossOrigin="anonymous" />,
    <script 
      src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" 
      integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" 
      crossOrigin="anonymous" />,
    <script 
      src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" 
      integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" 
      crossOrigin="anonymous" />
  ])
}