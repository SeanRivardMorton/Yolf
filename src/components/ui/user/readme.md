# User

A user can log in to Yolf, write notes, and publish them. They can also view other users notes, if shared.

## User Stories

- As a user, I want to log in to Yolf so that I can write notes.
- As a user, I want to write notes so that I can remember things.
- As a user, I want to publish my notes so that others can see them.
- As a user, I want to view other users notes so that I can learn from them.
- As a user, I want to upload a profile picture so that others can see me.
- As a user, I want to configure my settings so that I can customize my experience.
- As a user, I want to log out so that I can protect my account.
- As a user, I want to delete my account so that I can remove my data.

## Technical Implementation

- User authentication
- User profile configuration
- Note creation
- Note sharing

## Considerations

Implementing this in Next.js, I will need to have authenticated routes, and unauthenticated routes.

Maybe I can use middleware to check if a user is authenticated, and redirect them to the login page if they are not.

While in an authenticated route, users will be permitted to click on links to features and such.

Maybe I should do some research and see some common patterns for implementing authentication, protected, and unprotected routes in next.js
