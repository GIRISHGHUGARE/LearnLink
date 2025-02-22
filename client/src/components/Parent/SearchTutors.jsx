import React from 'react'
import ParentBooking from './Calendar'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/features/auth/authSlice'

const SearchTutors = () => {
    const user = useSelector(selectUser);
    return (

        <ParentBooking parentId={user._id} />
    )
}

export default SearchTutors