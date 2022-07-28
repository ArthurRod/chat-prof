import { useContext } from 'react';
import { AuthAdminContext } from '../contexts/AuthAdminContext'

export function useAdminAuth() {
    const value = useContext(AuthAdminContext)
    return value;
}