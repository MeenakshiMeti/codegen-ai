from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class DSARequest(BaseModel):
    problem: str
    language: str
    approach: str

class GeneralRequest(BaseModel):
    description: str
    language: str
    mode: str

class ExplainRequest(BaseModel):
    code: str
    language: str

class DebugRequest(BaseModel):
    code: str
    language: str
    error: str = ""

def call_groq(prompt: str) -> str:
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"GROQ ERROR: {e}")
        raise

@app.post("/generate/dsa")
async def generate_dsa(req: DSARequest):
    prompt = f"""You are an expert DSA tutor helping with placement interviews.
Generate {req.approach} solution(s) for the following problem in {req.language}.

Problem: {req.problem}

Include:
- Clean, well-commented code
- Time and Space complexity analysis
- Brief explanation of the approach

Return only the code and analysis, no extra commentary."""
    try:
        return {"result": call_groq(prompt)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate/general")
async def generate_general(req: GeneralRequest):
    prompt = f"""You are an expert software engineer.
Generate a {req.mode} in {req.language} based on the following description:

{req.description}

Requirements:
- Clean, production-ready code
- Add helpful comments
- Follow best practices for {req.language}

Return only the code, no extra commentary."""
    try:
        return {"result": call_groq(prompt)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/explain")
async def explain_code(req: ExplainRequest):
    prompt = f"""You are a code explanation expert.
Explain the following {req.language} code in a clear, beginner-friendly way.

Code:
{req.code}

Provide:
1. Overall purpose of the code
2. Step-by-step explanation of each section
3. Key concepts used
4. Any potential improvements

Be concise but thorough."""
    try:
        return {"result": call_groq(prompt)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/debug")
async def debug_code(req: DebugRequest):
    error_section = f"\nError message: {req.error}" if req.error else ""
    prompt = f"""You are an expert code debugger.
Analyze the following {req.language} code and identify all bugs and issues.{error_section}

Code:
{req.code}

Provide:
1. List of bugs/issues found
2. Fixed code with corrections highlighted in comments
3. Explanation of what was wrong and why

Return the fixed code and explanation."""
    try:
        return {"result": call_groq(prompt)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))