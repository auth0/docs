When importing objects into Auth0 tenants, Auth0 generates new IDs. To avoid import failure, by default identifier fields are stripped from the Auth0 objects on export. To override this behavior, use:

--export_ids
or
AUTH0_EXPORT_IDENTIFIERS: true