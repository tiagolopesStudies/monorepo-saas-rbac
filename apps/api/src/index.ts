import { ability } from '@repo/auth'

const userCanInvite = ability.can('invite', 'User')
const userCanDelete = ability.can('delete', 'User')
console.log(userCanInvite, userCanDelete)
