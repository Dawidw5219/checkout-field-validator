if ! command -v gh &> /dev/null; then
    echo "GitHub CLI could not be found. Please install GitHub CLI and try again"
    exit 1
fi

if ! gh auth status &> /dev/null; then
    echo "GitHub CLI is not authenticated. Please run 'gh auth login' to authenticate."
    exit 1
fi

VERSION=$(node -pe "require('./package.json').version")
NAME=$(node -pe "require('./package.json').name")
TAG_NAME="v$VERSION"
RELEASE_TITLE="$TAG_NAME"
RELEASE_NOTES="Pobierz plik $NAME.zip i zainstaluj go jako wtyczka na swojej stronie WordPress"

ZIP_FILE="./dist/$NAME.zip"
if [ ! -f "$ZIP_FILE" ]; then
    echo "Error: Build file $ZIP_FILE does not exist."
    exit 1
fi

echo "Creating GitHub release $TAG_NAME..."
gh release create $TAG_NAME $ZIP_FILE --title "$RELEASE_TITLE" --notes "$RELEASE_NOTES"
echo "Release $TAG_NAME created successfully."