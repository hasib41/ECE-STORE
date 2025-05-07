function getImgUrl(name) {
    // If name is empty or undefined, return a placeholder
    if (!name) {
        return 'https://via.placeholder.com/300x400?text=No+Image';
    }
    
    // Check if the URL appears to be an external URL (starts with http or https)
    if (name.startsWith('http://') || name.startsWith('https://')) {
        return name;
    }
    
    // Simple direct path to images in the public folder
    return `/images/${name}`;
}

export {getImgUrl}