#(This document based on document from google-images module at https://github.com/vdemedes/google-images. I edited more info to clear up!)#

# Set up Google Custom Search Engine

Google deprecated their public Google Images API, so to search for images you need to sign up for Google Custom Search Engine.
Here are the steps you need to do:

### 1. Create a Google Custom Search Engine

You can do this here: [https://cse.google.com/cse](https://cse.google.com/cse).

Do not specify any sites to search but instead use the "Restrict Pages using Schema.org Types" under the "Advanced options".
For the most inclusive set, use the Schema: `Thing`. Make a note of the CSE ID.

### 2. Enable Image Search

In your search engine settings, enable "Image search":

<img src="https://github.com/vdemedes/google-images/blob/master/media/screenshot.png" width="408" />

### 3. Set up a Google Custom Search Engine API

    - Register a new app and enable Google Custom Search Engine API here: [Google Developers Console](https://console.developers.google.com).
    - Generate Credentials API key. Make a note of the API key.
    - See https://developers.google.com/custom-search/json-api/v1/using_rest to know how to use api
    - See https://developers.google.com/custom-search/json-api/v1/reference/cse/list for optional query parameters

To wrap information, all you need to create a Google custom search engine includes:

    1. **API keys**, for example: AIzaScAGl5i8xHy1WC7t2baDcEDuxrUd17kSrtc
    2. **CX**, for example: 002703922123499277522:genaaaw4nz8
    3. **Query parameter**, for example: ?q=cat
    4. **An API, for example**: (this link is not really working!!!)
   https://www.googleapis.com/customsearch/v1?q=cats&cx=002703922123499277522:genaaaw4nz8&searchType=image&key=AIzaScAGl5i8xHy1WC7t2baDcEDuxrUd17kSrtc
    (searchType parameter is optional!)