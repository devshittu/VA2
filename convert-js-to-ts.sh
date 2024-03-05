#!/bin/bash

# Convert .jsx to .tsx
find ./app -type f -name "*.jsx" -exec bash -c 'mv "$0" "${0%.jsx}.tsx"' {} \;

# Convert .js to .ts
find ./app -type f -name "*.js" -exec bash -c 'mv "$0" "${0%.js}.ts"' {} \;
