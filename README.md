# How to run this project
In order for this project to run you will need besides of the barebones:
- Node
- Yarn
- Edit your local hosts file (with sudo permission). Add `127.0.0.1 stage.viaplay.se`. Usually it can be found under `/etc/hosts/` or in windows is usually at `C:\Windows\System32\drivers\etc\hosts`. This will point out https://stage.viaplay.se to localhost and allow us to freely use the API without extra authentication.
- Caddy Server: Web Server with automatic ssl certificates. Find your personal download flavour at https://caddyserver.com/docs/install. My personal preference in a Mac is `brew install caddy`.
- This projects files (please clone this repo)

Once you have all that you need to start the caddy server, then run the react-scripts, and then we can checkout the project at https://stage.viaplay.se
on the projects folder:
1. caddy run
2. yarn start
3. open https://stage.viaplay.se

## Can I completely ignore editing the hosts file and Caddy?
Yes, although the API provided does not allow CORS for localhost, you may still run the site at https://localhost:3000 while disabling CORS via browser extension.
- Chrome: https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en-US
- Firefox: https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/

## Is it possible to run without any of that?
Possibly, are there access tokens we can improve our fetching so we can request the API from localhost? If you know better than I do please edit the fetch config at `/src/utils/fetchViaplayApi.ts`.

---

# Rich Data and Schema Markup Case Study
This project intends to analyse Rich Metadata and Schema Markup on *Viaplay* website. The project will be prototyped using React.
The focus will be on a reasonable ui and data-structure, rather than other features.
In order to ease development a little, I am going to be using some helper packages, but that doesn't mean the same can't be accomplished in any other way.

## Current Results
There is currently no Rich Metadata or Schema Markup available, which means it is less likely that Google would automatically create widgets and set personalised suggestions even if the user has Viaplay installed on his device, has access cookies or even suggest to new users that might only find what they're looking for in that platform.

- Results on Rich structured data: https://search.google.com/test/rich-results?id=pxESVVn2-nwRdvV4vOCj2A
- Results on Schema Markup: https://validator.schema.org/?hl=en-US#url=https%3A%2F%2Fviaplay.se%2Fserier%2Faction


## Understand how structured data works
[Google Developers Documentation on advanced SEO](https://developers.google.com/search/docs/advanced/structured-data/intro-structured-data#markup-formats-and-placement)

## The difference between Schema.org, microdata, and structured data
Structured data is a system of pairing a name with a value that helps search engines categorize and index your content. Microdata is one form of structured data that works with HTML5. Schema.org is a project that provides a particular set of agreed-upon definitions for microdata tags.

## Does schema replace Open Graph?
Open Graph is a type of markup used by Facebook to parse out information like what image and description to display. Schema provides a more detailed list of options than Open Graph. They can be used together, but Open Graph cannot be used in place of schema.

## Search engines that use schema
Schema is recognized (and in fact the vocabulary is maintained) by Google, Bing, Yahoo!, and Yandex. It's unclear whether other search engines are using this markup to change how they display search results.

## Structured data's effect on rankings
Whether structured data affects rankings has been the subject of much discussion and many experiments. As of yet, there is no conclusive evidence that this markup improves rankings. But there are some indications that search results with more extensive rich snippets (like those created using schema) will have a better click-through rate. 

---

## Folder Structure

- components: Place all your components there. Each on its own folder. Child components belong on their parent folder unless they are used by another component. Export from an index.ts file.

- constants: Files for different types of constants you might need on your app. Export from an index.ts file.

- hooks: Each hook belongs on its own file and should have its own named export. Export from an index.ts file.

- types: Types that may be globally needed. Not to confuse with components props. Those should be close with each particular component.

- utils: Utility functions that serve multiple purpose and might have a re-use. 


---

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

