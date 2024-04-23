if ! command -v gh &> /dev/null; then
    echo "GitHub CLI could not be found. Please install GitHub CLI and try again"
    exit 1
fi

VERSION=$(node -pe "require('./package.json').version")
TAG_NAME="v$VERSION"
RELEASE_TITLE="Release $TAG_NAME"
RELEASE_NOTES="Release notes for version $TAG_NAME"

ZIP_FILE="./dist/checkout-field-validator.zip"
if [ ! -f "$ZIP_FILE" ]; then
    echo "Error: Build file $ZIP_FILE does not exist."
    exit 1
fi

echo "Creating GitHub release $TAG_NAME..."
gh release create $TAG_NAME $ZIP_FILE --title "$RELEASE_TITLE" --notes "$RELEASE_NOTES"
echo "Release $TAG_NAME created successfully."