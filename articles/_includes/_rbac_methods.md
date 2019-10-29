Currently, we provide two ways of implementing [role-based access control (RBAC)](/authorization/concepts/rbac), which you can use in place of or in combination with your API's own internal access control system:

* [Authorization Core](/authorization/guides/how-to)
* [Authorization Extension](/extensions/authorization-extension)

We are expanding our Authorization Core feature set to match the functionality of the Authorization Extension and expect a final release in 2020. Our new core RBAC implementation improves performance and scalability and will eventually provide a more flexible RBAC system than the Authorization Extension.

For now, both implement the key features of RBAC and allow you to restrict the custom <dfn data-key="scope">scopes</dfn> defined for an API to those that have been assigned to the user as permissions. For a comparison, see [Authorization Core vs. Authorization Extension](/authorization/concepts/core-vs-extension).