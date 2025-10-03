# Replay Attack

## What is a Replay Attack?

A replay attack is when an attacker intercepts a valid data transmission and then maliciously repeats or delays it. Think of it like recording someone saying "Transfer $100 to John" and then playing that recording again and again to make multiple transfers!

It's like overhearing someone's password and using it later - except the attacker doesn't even need to understand what's being said, they just copy and replay it.

## How Does a Replay Attack Work?

### The Attack Flow:

1. **Interception**: Attacker eavesdrops on legitimate communication
2. **Capture**: Records the data transmission (even if encrypted)
3. **Replay**: Sends the captured data again to the system
4. **System Accepts**: Target system thinks it's a legitimate request
5. **Malicious Action**: Unauthorized action is performed

## Real-World Analogy

Imagine you have a voice-activated door:

**Normal Use:**
- You say "Open the door for Alice" → Door opens

**Replay Attack:**
- Attacker records you saying "Open the door for Alice"
- Later, attacker plays the recording
- Door hears the recording and opens (even though you didn't say it this time!)

The door can't tell the difference between a live command and a recording.

## Types of Replay Attacks

### 1. **Authentication Replay**
**Example**: Replaying login credentials
- Attacker captures encrypted login session
- Replays it to gain unauthorized access
- Even works if they can't decrypt the password!

### 2. **Payment Replay**
**Example**: Repeating a money transfer
- Attacker captures a payment transaction
- Replays it to make duplicate payments
- Same payment happens multiple times

### 3. **Session Replay**
**Example**: Reusing session tokens
- Attacker captures session authentication
- Replays it to hijack your session
- Gains access to your account

### 4. **Smart Card Replay**
**Example**: Replaying access card signals
- Attacker copies access card signal
- Replays it to gain building access
- Works even without the physical card

## Real-World Example Scenario

### Online Banking Attack:

**Step 1**: Alice logs into her bank and transfers $100 to Bob
```
Encrypted Request: [XyZ123AbC...] (Transfer $100 to Bob)
```

**Step 2**: Attacker intercepts this encrypted request

**Step 3**: Attacker replays the same request 10 times

**Result**: Bob receives $1,000 instead of $100!

The bank accepts each replayed request as legitimate because it's the exact same valid, encrypted request.

## Why Replay Attacks Work

🔓 **Encrypted but not protected**: Encryption only protects content, not freshness
🔓 **No timestamp verification**: System can't tell if message is old
🔓 **No uniqueness check**: Same message can be valid multiple times
🔓 **Stateless systems**: System doesn't track what it already processed

## How to Prevent Replay Attacks

### 1. **Timestamps**
- Include current time in each message
- Reject messages that are too old
- **Example**: "This request is only valid for 30 seconds"

### 2. **Nonce (Number Used Once)**
- Random number included in each request
- Each nonce can only be used once
- **Example**: Request #12345 - if seen again, reject

### 3. **Sequence Numbers**
- Each message has an incrementing number
- Reject messages with old sequence numbers
- **Example**: Accept request #101, reject #100

### 4. **Session Keys**
- New encryption key for each session
- Old messages won't work in new sessions
- **Example**: Yesterday's key won't work today

### 5. **Challenge-Response**
- Server sends unique challenge
- Client must respond to that specific challenge
- **Example**: "What's 5 + 7?" → Response only valid for this question

### 6. **One-Time Passwords (OTP)**
- Each password only works once
- **Example**: Google Authenticator codes expire

## Protection in Practice

### HTTPS/TLS:
- Uses sequence numbers
- Includes timestamps
- Provides session uniqueness

### Kerberos Authentication:
- Includes timestamps in tickets
- Tickets have limited validity
- Mutual authentication

### Payment Systems:
- Transaction IDs (unique per transaction)
- Timestamps
- Amount limits and verification

### Two-Factor Authentication:
- Time-based codes (TOTP)
- Code only valid for 30-60 seconds
- Different code each time

## Detection Methods

🔍 **Duplicate Detection**: Look for identical requests
🔍 **Timing Analysis**: Check for unusual request timing
🔍 **Behavioral Analysis**: Unusual patterns (10 transfers in 1 second)
🔍 **Log Monitoring**: Track and alert on suspicious activity

## Real-World Incidents

### Garage Door Openers:
- Old systems vulnerable to replay
- Attacker records signal, opens door later
- Modern systems use rolling codes

### Contactless Payment Cards:
- Early systems vulnerable to replay
- Modern cards use dynamic CVV/challenge-response
- Each transaction requires unique code

### WiFi Networks:
- WEP encryption vulnerable to replay
- WPA2/WPA3 includes replay protection
- Uses packet numbers to detect replays

## Key Takeaway

A replay attack is like recording someone's voice to unlock their phone later - the attacker doesn't need to know what was said, just needs to play it back. The defense is to make sure each message is unique and time-sensitive, so an old recording won't work. Modern systems use timestamps, one-time codes, and session uniqueness to ensure that "I said it 5 minutes ago" doesn't mean "it's still valid now."

**Simple Rule**: If a message doesn't have a "best before" date or unique ID, it's vulnerable to being replayed!
