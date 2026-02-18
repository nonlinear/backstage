#!/bin/bash
# Navigation Block Update - Auto-update navigation blocks in all backstage files

# Update README.md navigation block
if [[ -f README.md ]] && grep -q "> 🤖" README.md; then
    # Remove old nav block and insert new one
    awk '
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
                    print "> - [README](README.md)"
                    print "> - [ROADMAP](backstage/ROADMAP.md)"
                    print "> - [CHANGELOG](backstage/CHANGELOG.md)"
                    print "> - policies: [local](backstage/policies/local/), [global](backstage/policies/global/)"
                    print "> - checks: [local](backstage/checks/local/), [global](backstage/checks/global/)"
                    print ">"
                    print "> We use **[backstage protocol](https://github.com/nonlinear/backstage)**, v0.3.4"
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
        awk '
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
                        print "> - [README](../README.md) - Our project"
                        print "> - [CHANGELOG](CHANGELOG.md) — What we did"
                        print "> - [ROADMAP](ROADMAP.md) — What we wanna do"
                        print "> - policies: [local](policies/local/), [global](policies/global/) — How we do it"
                        print "> - checks: [local](checks/local/), [global](checks/global/) — What we accept"
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

echo '✅ Navigation blocks updated' || echo '❌ Navigation block update failed'
