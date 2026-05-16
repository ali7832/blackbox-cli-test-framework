import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Activity, AlertTriangle, CheckCircle2, Code2, FileJson, GitBranch, PlayCircle, Rocket, ShieldCheck, TerminalSquare, TimerReset, XCircle } from 'lucide-react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import './styles.css';

const pages = ['Overview', 'Spec Builder', 'Execution Lab', 'Failure Intelligence', 'Reports', 'CI/CD'];
const passTrend = [{day:'Mon',pass:91,fail:9},{day:'Tue',pass:94,fail:6},{day:'Wed',pass:89,fail:11},{day:'Thu',pass:96,fail:4},{day:'Fri',pass:98,fail:2}];
const runtimeMix = [{name:'Python',value:34,color:'#38bdf8'},{name:'Node',value:24,color:'#a78bfa'},{name:'Go',value:18,color:'#22c55e'},{name:'Bash',value:24,color:'#f59e0b'}];
const failures = [
  ['api-health','timeout','critical','Command exceeded 5s timeout'],
  ['node-cli-help','stdout','medium','Expected help text missing'],
  ['go-binary-version','exit-code','high','Expected 0, received 2'],
  ['python-version','passed','low','All assertions passed']
];

function simulate(spec){
  const risky = Number(spec.timeout_seconds) < 3 || spec.command.includes('deploy') || spec.command.includes('curl');
  return { suite:'release-gate', total:8, passed:risky?6:8, failed:risky?2:0, duration:risky?'18.4s':'7.2s', status:risky?'attention':'passed', evidence:[risky?'Timeout risk detected':'All commands completed successfully', risky?'Network/API command should be isolated':'Assertions matched expected output', 'JSON report generated for CI evidence'] };
}

function App(){
  const [active,setActive] = useState('Overview');
  const [spec,setSpec] = useState({name:'api-health',command:'curl http://localhost:8000/health',expected_exit_code:0,stdout_contains:'ok',timeout_seconds:5});
  const [run,setRun] = useState(simulate(spec));
  const metrics = useMemo(()=>[
    ['Suites Executed','1,284','+18%',PlayCircle],['Pass Rate','96.8%','+4.1%',CheckCircle2],['Avg Duration','7.8s','-21%',TimerReset],['Release Gates','42','all active',ShieldCheck]
  ],[]);
  return <main className="app-shell"><aside className="sidebar"><div className="brand"><TerminalSquare/><div><strong>BlackboxIQ</strong><span>CLI Quality Intelligence</span></div></div>{pages.map(p=><button className={active===p?'active':''} onClick={()=>setActive(p)} key={p}>{p}</button>)}</aside><section className="workspace"><header className="topbar"><div><p className="eyebrow">Platform QA command center</p><h1>{active}</h1></div><button onClick={()=>setRun(simulate(spec))}>Run suite</button></header>{active==='Overview'&&<Overview metrics={metrics}/>} {active==='Spec Builder'&&<SpecBuilder spec={spec} setSpec={setSpec} run={run} setRun={setRun}/>} {active==='Execution Lab'&&<ExecutionLab run={run}/>} {active==='Failure Intelligence'&&<FailureIntelligence/>} {active==='Reports'&&<Reports run={run}/>} {active==='CI/CD'&&<CICD/>}</section></main>
}
function Overview({metrics}){return <><section className="metrics">{metrics.map(([l,v,d,Icon])=><article className="card" key={l}><Icon/><span>{l}</span><strong>{v}</strong><small>{d}</small></article>)}</section><section className="grid"><Panel title="Pass-rate trend" icon={<Activity/>}><ResponsiveContainer width="100%" height={260}><AreaChart data={passTrend}><CartesianGrid strokeDasharray="3 3" stroke="#243447"/><XAxis dataKey="day" stroke="#93a4b8"/><YAxis stroke="#93a4b8"/><Tooltip/><Area dataKey="pass" stroke="#22c55e" fill="#166534"/><Area dataKey="fail" stroke="#fb7185" fill="#7f1d1d"/></AreaChart></ResponsiveContainer></Panel><Panel title="Runtime coverage" icon={<Code2/>}><ResponsiveContainer width="100%" height={260}><PieChart><Pie data={runtimeMix} dataKey="value" nameKey="name" outerRadius={92}>{runtimeMix.map(r=><Cell key={r.name} fill={r.color}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer></Panel></section></>}
function SpecBuilder({spec,setSpec,run,setRun}){return <section className="grid"><Panel title="YAML spec designer" icon={<FileJson/>}>{Object.entries(spec).map(([k,v])=><label key={k}>{k.replaceAll('_',' ')}<input value={v} onChange={e=>setSpec({...spec,[k]:e.target.value})}/></label>)}<button onClick={()=>setRun(simulate(spec))}>Validate spec</button></Panel><Panel title="Generated spec preview" icon={<TerminalSquare/>}><pre>{`suite: release-gate\ntests:\n  - name: ${spec.name}\n    command: ${spec.command}\n    expected_exit_code: ${spec.expected_exit_code}\n    stdout_contains: ${spec.stdout_contains}\n    timeout_seconds: ${spec.timeout_seconds}`}</pre><div className={`status ${run.status}`}>{run.status}</div></Panel></section>}
function ExecutionLab({run}){return <section className="grid"><Panel title="Suite result" icon={<Rocket/>}><div className="score"><span>{run.status}</span><strong>{run.passed}/{run.total}</strong><p>Duration: {run.duration}</p></div>{run.evidence.map(e=><div className="reason" key={e}>{e}</div>)}</Panel><Panel title="Execution matrix" icon={<BarChartIcon/>}><ResponsiveContainer width="100%" height={260}><BarChart data={passTrend}><XAxis dataKey="day" stroke="#93a4b8"/><YAxis stroke="#93a4b8"/><Tooltip/><Bar dataKey="pass" fill="#38bdf8"/><Bar dataKey="fail" fill="#fb7185"/></BarChart></ResponsiveContainer></Panel></section>}
function FailureIntelligence(){return <Panel title="Failure classification" icon={<AlertTriangle/>}><div className="table">{failures.map(row=><div className="row" key={row[0]}>{row.map(cell=><span key={cell}>{cell}</span>)}</div>)}</div></Panel>}
function Reports({run}){return <section className="grid"><Panel title="JSON report" icon={<FileJson/>}><pre>{JSON.stringify({suite:run.suite,total:run.total,passed:run.passed,failed:run.failed,duration:run.duration},null,2)}</pre></Panel><Panel title="Release evidence" icon={<CheckCircle2/>}><div className="reason">Report artifact ready for CI upload.</div><div className="reason">Failure categories available for analyst review.</div><div className="reason">Suite summary can block release gates when failure threshold is exceeded.</div></Panel></section>}
function CICD(){return <section className="grid"><Panel title="Pipeline integration" icon={<GitBranch/>}><div className="pipeline"><div>checkout</div><div>install</div><div>blackbox run</div><div>publish report</div><div>release gate</div></div></Panel><Panel title="Quality controls" icon={<ShieldCheck/>}><div className="reason">Fail-fast mode for critical release checks.</div><div className="reason">Timeout detection for unstable commands.</div><div className="reason">Structured JSON output for dashboards and CI evidence.</div></Panel></section>}
function BarChartIcon(){return <BarChart3/>}
function Panel({title,icon,children}){return <article className="panel"><div className="panel-title">{icon}<h2>{title}</h2></div>{children}</article>}

createRoot(document.getElementById('root')).render(<App/>);
