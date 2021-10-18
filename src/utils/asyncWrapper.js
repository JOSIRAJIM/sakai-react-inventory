
// https://dev.to/dewaldels/javascript-async-await-wrapper-22ao
export const asyncWrapper = async (asyncFunction, params = null) => {
    try {
        const data = await asyncFunction(params)
        return [data, null]
    }
    catch (error) {
        return [ null, error ]
    }
}
// Use

// const handleFetchAllClick = async () => {
//     // No gross try/catch everywhere
//     const [users, usersError] = await asyncWrapper(fetchUsersRequest)
//     const [todos, todosError] = await asyncWrapper(fetchTodosRequest)
//     const [user, userError] = await asyncWrapper(fetchUserByIdRequest, 1)
//     const [newUser, newUserError] = await asyncWrapper(createUsersRequest, mockUser)4
// }