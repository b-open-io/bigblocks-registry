# Phase 2: Interactive Q&A

When not in automated mode, gather additional context by asking targeted questions.

## Questions to Ask Based on Component Type

### For Authentication Components
1. **Backup Type Support**
   - Which backup types should be supported? (Default: BapMemberBackup, OneSatBackup, WifBackup)
   - Should BapMasterBackup be allowed? (Security implications)
   
2. **Storage Preferences**
   - Custom storage namespace? (Default: based on NODE_ENV)
   - Session timeout duration? (Default: 24 hours)
   
3. **API Integration**
   - Custom auth server URL? (Default: auth.sigmaidentity.com)
   - Additional auth endpoints needed?

### For Wallet Components
1. **Transaction Types**
   - Simple BSV transfers only?
   - Token operations support?
   - Ordinals/inscriptions support?
   
2. **UI Preferences**
   - Show fiat conversion? (Default: USD)
   - Display transaction history?
   - Include QR code generation?
   
3. **Validation Rules**
   - Custom fee calculation?
   - Address validation strictness?
   - Memo/OP_RETURN support?

### For Social Components
1. **Content Types**
   - Text posts only?
   - Media uploads (images/video)?
   - Markdown support?
   
2. **Interaction Features**
   - Like/unlike functionality?
   - Reply threading?
   - User mentions (@user)?
   
3. **Data Source**
   - BMAP API endpoints to use?
   - Real-time updates needed?
   - Pagination strategy?

### For Market Components
1. **Listing Types**
   - NFT/Ordinals only?
   - General marketplace?
   - Auction support?
   
2. **Payment Flow**
   - Direct P2P transactions?
   - Escrow service integration?
   - Multi-signature support?
   
3. **Search/Filter Options**
   - Category filters?
   - Price ranges?
   - Sort options?

## General Questions for All Components

### Visual Design
1. **Size Variants**
   - Which sizes needed? (sm, md, lg, xl)
   - Responsive breakpoints?
   - Mobile-first priority?

2. **Theme Integration**
   - Custom color variants?
   - Animation preferences?
   - Icon set to use?

### Error Handling
1. **User Feedback**
   - Toast notifications?
   - Inline error messages?
   - Loading states design?

2. **Recovery Options**
   - Retry mechanisms?
   - Fallback UI?
   - Offline support?

### Integration
1. **Provider Dependencies**
   - Requires authentication?
   - Needs wallet access?
   - Theme provider usage?

2. **Event Handling**
   - Success callbacks needed?
   - Error callbacks needed?
   - Progress tracking?

## Question Format Template

```
To create the best [COMPONENT_NAME] component, I need to understand a few requirements:

**Core Functionality:**
1. [Specific question about main feature]
2. [Question about edge case handling]

**User Experience:**
1. [Question about UI behavior]
2. [Question about feedback mechanisms]

**Integration:**
1. [Question about data flow]
2. [Question about other component dependencies]

Would you like me to use the defaults for any of these, or do you have specific preferences?
```

## Default Assumptions

If user wants to proceed with defaults:

### Authentication Components
- Support standard backup types (exclude BapMasterBackup)
- Use auth.sigmaidentity.com
- 24-hour session timeout
- Auto-detect OAuth context

### Wallet Components
- BSV transfers only (no tokens initially)
- Show USD conversion
- Standard fee calculation
- Basic address validation

### Social Components
- Text posts with markdown
- Like functionality included
- BMAP API integration
- 20 items per page

### Market Components
- NFT/Ordinals focus
- Direct P2P payments
- Basic search/filter
- Grid layout display

## Automated Mode Defaults

When `interactive: false` or in CI/CD:
- Use all defaults listed above
- Follow sensible-defaults.md patterns
- Implement most common use case
- Add configuration props for customization
- Document all assumptions in component README