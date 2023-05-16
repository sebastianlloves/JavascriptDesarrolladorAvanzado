const navegate = path => {
    console.log(path);
    history.pushState(path, '', path)
}