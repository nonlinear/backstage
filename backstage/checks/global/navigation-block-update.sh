#!/bin/bash
# Navigation Block Update - Auto-update navigation blocks with dynamic counts and version

# Detect version (from branch or VERSION file)
BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
if [[ "$BRANCH" == "main" ]]; then
    VERSION=$(cat backstage/VERSION 2>/dev/null || echo "0.3.4")
elif [[ "$BRANCH" =~ ^v([0-9]+\.[0-9]+\.[0-9]+) ]]; then
    VERSION="${BASH_REMATCH[1]}"
else
    VERSION=$(cat backstage/VERSION 2>/dev/null || echo "0.3.4")
fi

# Count files in each folder
POLICIES_LOCAL=$(find backstage/policies/local -name "*.md" ! -name "README.md" 2>/dev/null | wc -l | tr -d ' ')
POLICIES_GLOBAL=$(find backstage/policies/global -name "*.md" ! -name "README.md" 2>/dev/null | wc -l | tr -d ' ')
CHECKS_LOCAL=$(find backstage/checks/local -name "*.sh" ! -name "README.md" 2>/dev/null | wc -l | tr -d ' ')
CHECKS_GLOBAL=$(find backstage/checks/global -name "*.sh" ! -name "README.md" 2>/dev/null | wc -l | tr -d ' ')

# Update README.md navigation block
if [[ -f README.md ]] && grep -q "> 🤖" README.md; then
    awk -v ver="$VERSION" -v pl="$POLICIES_LOCAL" -v pg="$POLICIES_GLOBAL" -v cl="$CHECKS_LOCAL" -v cg="$CHECKS_GLOBAL" '
        BEGIN { in_nav=0; done=0 }
        /^> 🤖$/ {
            if (in_nav == 0) {
                in_nav = 1
                next
            } else {
                in_nav = 0
                if (done == 0) {
                    print ""
                    print "> 🤖"
                    print ">"
                    print "> This project follows [backstage protocol](https://github.com/nonlinear/backstage) v" ver
                    print ">"
                    print "> [README](README.md) 👏 [ROADMAP](backstage/ROADMAP.md) 👏  [CHANGELOG](backstage/CHANGELOG.md) 👏 policies: [local](backstage/policies/local/) <sup>" pl "</sup>, [global](backstage/policies/global/) <sup>" pg "</sup> 👏 checks: [local](backstage/checks/local/) <sup>" cl "</sup>, [global](backstage/checks/global/) <sup>" cg "</sup>"
                    print ">"
                    print "> 🤖"
                    print ""
                    done = 1
                }
                next
            }
        }
        in_nav == 0 { print }
    ' README.md > /tmp/readme_updated.md && mv /tmp/readme_updated.md README.md
fi

# Update backstage files navigation blocks
for file in backstage/ROADMAP.md backstage/CHANGELOG.md; do
    if [[ -f "$file" ]] && grep -q "> 🤖" "$file"; then
        awk -v ver="$VERSION" -v pl="$POLICIES_LOCAL" -v pg="$POLICIES_GLOBAL" -v cl="$CHECKS_LOCAL" -v cg="$CHECKS_GLOBAL" '
            BEGIN { in_nav=0; done=0 }
            /^> 🤖$/ {
                if (in_nav == 0) {
                    in_nav = 1
                    next
                } else {
                    in_nav = 0
                    if (done == 0) {
                        print ""
                        print "> 🤖"
                        print "> This project follows [backstage protocol](https://github.com/nonlinear/backstage) v" ver
                        print ">"
                        print "> - [README](../README.md) 👏 [ROADMAP](ROADMAP.md) 👏  [CHANGELOG](CHANGELOG.md) 👏 policies: [local](policies/local/) <sup>" pl "</sup>, [global](policies/global/) <sup>" pg "</sup> 👏 checks: [local](checks/local/) <sup>" cl "</sup>, [global](checks/global/) <sup>" cg "</sup>"
                        print ">"
                        print "> 🤖"
                        print ""
                        done = 1
                    }
                    next
                }
            }
            in_nav == 0 { print }
        ' "$file" > /tmp/file_updated.md && mv /tmp/file_updated.md "$file"
    fi
done

echo "✅ Navigation blocks updated (v$VERSION, policies: ${POLICIES_LOCAL}+${POLICIES_GLOBAL}, checks: ${CHECKS_LOCAL}+${CHECKS_GLOBAL})"
