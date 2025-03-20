# Prompt Engineering Guide

## Core Structure

Every prompt consists of tag categories that serve specific purposes:

### Core Tags

- `<system>` - Defines the AI's role and capabilities
- `<user>` - Contains the user's request/query
- `<assistant>` - Contains the AI's response format and approach

### Step Tags

Sequential steps for processing and executing tasks:

- `<step as="comprehension">` - Initial understanding of requirements
- `<step as="analysis">` - Breaking down required components
- `<step as="strategy">` - Planning the implementation
- `<step as="execution">` - Actual implementation steps
- `<step as="validation">` - Verification checklist

### Specialized Tags

Task-specific tags for additional context:

- `<context>` - Additional background information
- `<constraints>` - Limitations or requirements
- `<output>` - Expected output format
- `<examples>` - Sample implementations
- `<format>` - Specific formatting requirements

### Interactive Tags

Tags for handling user interaction:

- `<feedback>` - User feedback handling
- `<clarification>` - Points needing clarification
- `<iteration>` - Revision and improvement steps

### Meta Tags

Documentation and management tags:

- `<metadata>` - Prompt information
- `<dependencies>` - Required resources/tools

## Usage Instructions

1. **Creating New Prompts**

   ```xml
   <system>
     Define the AI's role and expertise
   </system>

   <user>
     Specify the task or request
   </user>

   <step as="comprehension">
     List key requirements and constraints
   </step>
   ```

2. **Step Structure**

   - Each step should be focused and specific
   - Use bullet points for clarity
   - Include validation checkpoints

3. **Best Practices**
   - Keep instructions clear and concise
   - Use consistent formatting
   - Include validation steps
   - Specify all requirements upfront

## Tag Reference

### Core Tags

| Tag           | Purpose                          |
| ------------- | -------------------------------- |
| `<system>`    | Defines AI capabilities and role |
| `<user>`      | Contains user request            |
| `<assistant>` | Defines response approach        |

### Step Tags

| Tag             | Purpose                    |
| --------------- | -------------------------- |
| `comprehension` | Understanding requirements |
| `analysis`      | Component breakdown        |
| `strategy`      | Implementation planning    |
| `execution`     | Implementation steps       |
| `validation`    | Verification checklist     |

### Example Usage

```xml
<system>
You are an expert in [technology], specializing in [specific area].
</system>

<user>
[Specific request or task]
</user>

<step as="comprehension">
- Requirement 1
- Requirement 2
</step>

<step as="execution">
1. Step one
2. Step two
</step>

<step as="validation">
✓ Checkpoint 1
✓ Checkpoint 2
</step>
```

## Tips for Effective Prompts

1. Start with clear system context
2. Break tasks into logical steps
3. Include validation checkpoints
4. Use consistent formatting
5. Keep instructions concise
6. Add examples for complex tasks

## Common Patterns

- Use bullet points for lists
- Number sequential steps
- Include checkmarks (✓) in validation steps
- Use consistent indentation
- Keep related information grouped
