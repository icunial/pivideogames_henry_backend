// Validates name
const validateName = (name: string): boolean | string => {
    if(!name) return "Name parameter is missing"
    if(typeof name !== "string") return "Name must be a string"
    return false
}

// Validates description
const validateDescription = (description: string): boolean | string => {
    if(!description) return "Description parameter is missing"
    if(typeof description !== "string") return "Description must be a string"
    return false
}

// Validates released
const validateReleased = (released: string) : boolean | string => {
    if(!released) return "Released parameter is missing"
    if(typeof released !== "string") return "Released must be a string"
    return false
}

// Validates rating
const validateRating = (rating: number) : boolean | string => {
    if(!rating) return "Rating parameter is missing"
    if(typeof rating !== "number") return "Rating must be a number"
    return false
}