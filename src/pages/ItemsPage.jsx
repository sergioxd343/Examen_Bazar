import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { InputText } from 'primereact/inputtext';
import { ListItems } from '../components/ListItems';

export const ItemsPage = () => {

  return (
    <div>
        <ListItems></ListItems>
    </div>
  )
}
