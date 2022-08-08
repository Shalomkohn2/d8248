### What changes would you have to make to the application if it came from an API?

Instead of importing, you would have to fetch blogs.json into BlogList.jsx

### In what type of hook should you use to fetch the data and why?

You should use the useEffect hook since it only executes once when the page is loaded or when otherwise specified in the dependency array.

### What other considerations would you have to make?

Once you fetch the data you should save into a state variable so you can work with it in a flexible way.

### Part of this application uses the package nanoid to generate keys. What issue would this cause for generating keys in React?

The problem with nanoid is that it can generate the same key twice and in react each element needs their own unique key.
