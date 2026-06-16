import { defineAbilityFor } from '@repo/auth'

const ability = defineAbilityFor({ role: 'MEMBER' })

const userCanInvite = ability.can('invite', 'User')
const userCanDelete = ability.can('delete', 'User')
console.log(userCanInvite, userCanDelete)
