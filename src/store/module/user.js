import Storage from '@/storage'
import {
    login,
    logout
} from '@/api/user'

import {
    setToken,
    getToken
} from '@/libs/utils'

export default {
    state: {
        accountId: Storage.get( 'accountId' ),
        loginType: Storage.get( 'loginType' ),
        loginName: Storage.get( 'loginName' )
    },
    mutations: {
        setAccountId( state, accountId ) {
            state.accountId = accountId
            Storage.set( 'accountId', accountId )
        },
        setLoginType( state, loginType ) {
            state.loginType = loginType
            Storage.set( 'loginType', loginType )
        },
        setLoginName( state, loginName ) {
            state.loginName = loginName
            Storage.set( 'loginName', loginName )
        }
    },
    actions: {
        handleLogin( {
            commit
        }, {
            loginName,
            password
        } ) {
            loginName = loginName.trim()
            return new Promise( ( resolve, reject ) => {
                login( {
                    loginName,
                    password
                } ).then( res => {
                    commit( 'setAccountId', res.accountid )
                    commit( 'setLoginType', res.logintype )
                    commit( 'setLoginName', loginName )
                    resolve( res )
                } ).catch( err => {
                    reject( err )
                } )
            } )
        },
        handleLogout( {
            commit
        } ) {
            return new Promise( ( resolve, reject ) => {
                logout().then( () => {
                    commit( 'setToken', '' )
                    commit( 'setUserName', '' )
                    commit( 'setUserId', '' )
                    resolve()
                } ).catch( err => {
                    reject( err )
                } )
            } )
        }
    }
}
