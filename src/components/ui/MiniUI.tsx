import { Css } from "./Css";

// Grayscale, purely illustrative interfaces hinting at what each project does.
// They contain no real data: labels only restate words from the project's own description.

const DESC: Record<string, string> = {
  "push-engine": "a campaign composer sending one notification to many sites",
  ewms: "a Kanban board with task cards in three columns",
  "directory-platform": "a search bar above a grid of listing cards with package badges",
  "crm-payments": "a payments table where each row is matched to a customer",
  infrastructure: "a list of services with status lights",
  eversatile: "three app tiles for POS, BizManager and HRMS",
};

export function MiniUI({ id }: { id: string }) {
  return (
    <div className="mui" role="img" aria-label={`Illustrative UI: ${DESC[id] ?? "product interface"}`}>
      <Css id="mini-ui" css={CSS} />
      <div className="mui-bar" aria-hidden="true"><i /><i /><i /><b /></div>
      <div className="mui-body" aria-hidden="true">{body(id)}</div>
      <span className="mui-label" aria-hidden="true">Illustrative UI</span>
    </div>
  );
}

const lines = (n: number, w = [80, 60, 70]) => Array.from({ length: n }, (_, i) => <span key={i} className="mui-line" style={{ width: `${w[i % w.length]}%` }} />);

function body(id: string) {
  switch (id) {
    case "push-engine":
      return (
        <div className="mui-push">
          <div className="mui-panel">
            <span className="mui-k">Campaign</span>
            {lines(2)}
            <span className="mui-k">Send to</span>
            <div className="mui-pills"><span className="on">All sites</span><span>Segment</span></div>
            <span className="mui-btn">Schedule</span>
          </div>
          <div className="mui-stack">
            {[0, 1, 2].map((i) => (
              <div key={i} className="mui-toast" style={{ ["--k" as string]: i }}>
                <span className="mui-dot" />
                <div>{lines(2, [70, 45])}</div>
              </div>
            ))}
          </div>
        </div>
      );
    case "ewms":
      return (
        <div className="mui-kanban">
          {[3, 2, 2].map((n, c) => (
            <div key={c} className="mui-col">
              <span className="mui-k">{["To do", "Doing", "Done"][c]}</span>
              {Array.from({ length: n }, (_, i) => (
                <div key={i} className="mui-task">{lines(2, [85, 50])}<span className="mui-av" /></div>
              ))}
            </div>
          ))}
        </div>
      );
    case "directory-platform":
      return (
        <div className="mui-dir">
          <div className="mui-search"><span className="mui-line" style={{ width: "40%" }} /><span className="mui-btn sm">Search</span></div>
          <div className="mui-listings">
            {["VIP", "Premium", "Basic", "Premium", "Basic", "VIP"].map((b, i) => (
              <div key={i} className="mui-listing"><span className="mui-thumb" /><span className="mui-badge">{b}</span>{lines(1, [70])}</div>
            ))}
          </div>
        </div>
      );
    case "crm-payments":
      return (
        <div className="mui-table">
          <div className="mui-row head"><span>Payment</span><span>Customer</span><span>Match</span></div>
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="mui-row" style={{ ["--k" as string]: i }}>
              {lines(1, [60 + (i % 3) * 10])}
              {lines(1, [70 - (i % 2) * 15])}
              <span className={`mui-check${i === 3 ? " flag" : ""}`} />
            </div>
          ))}
        </div>
      );
    case "infrastructure":
      return (
        <div className="mui-infra">
          {["Reverse proxy", "Docker stacks", "Databases", "Backups", "Monitoring", "VPN"].map((s, i) => (
            <div key={s} className="mui-svc" style={{ ["--k" as string]: i }}>
              <span className="mui-light" />
              <span className="mui-svc-n">{s}</span>
              <span className="mui-spark" />
            </div>
          ))}
        </div>
      );
    default:
      return (
        <div className="mui-apps">
          {["POS", "BizManager", "HRMS"].map((a) => (
            <div key={a} className="mui-app"><span className="mui-icon" /><b>{a}</b>{lines(2, [80, 55])}</div>
          ))}
        </div>
      );
  }
}

const CSS = `@layer components{
.mui{position:relative;height:100%;min-height:0;border-radius:20px;background:#f7f6f3;box-shadow:var(--hair);overflow:hidden;display:flex;flex-direction:column}
.mui-bar{display:flex;align-items:center;gap:6px;padding:12px 14px;border-bottom:1px solid var(--line);background:#fff}
.mui-bar i{width:9px;height:9px;border-radius:50%;background:#dcd9d3}
.mui-bar b{margin-left:10px;height:10px;width:46%;border-radius:6px;background:#eceae5}
.mui-body{flex:1;min-height:0;padding:18px;display:flex}
.mui-body>*{flex:1;min-width:0}
.mui-label{position:absolute;left:14px;bottom:12px;font:500 10px/1 var(--font-mono);letter-spacing:.16em;text-transform:uppercase;color:var(--label);background:#f7f6f3;padding:4px 6px;border-radius:4px}
.mui-line{display:block;height:7px;border-radius:5px;background:#dedbd5;margin:5px 0}
.mui-k{display:block;font:500 9.5px/1 var(--font-mono);letter-spacing:.12em;text-transform:uppercase;color:#77756f;margin:6px 0 6px}
.mui-btn{display:inline-block;margin-top:12px;padding:7px 14px;border-radius:999px;background:#0d0d0d;color:#fff;font-size:10.5px;font-weight:600}
.mui-btn.sm{margin:0;padding:6px 12px}
.mui-pills{display:flex;gap:6px}.mui-pills span{font-size:10px;padding:4px 10px;border-radius:999px;box-shadow:var(--hair);background:#fff}.mui-pills .on{background:#0d0d0d;color:#fff;box-shadow:none}
.mui-push{display:grid;grid-template-columns:1.1fr 1fr;gap:16px;align-items:start}
.mui-panel{background:#fff;border-radius:14px;padding:14px;box-shadow:var(--hair)}
.mui-stack{display:flex;flex-direction:column;gap:10px;padding-top:6px}
.mui-toast{display:flex;gap:10px;align-items:center;background:#fff;border-radius:12px;padding:10px 12px;box-shadow:var(--hair),0 10px 20px -14px rgba(0,0,0,.35);transform:translateX(calc(var(--k)*8px));animation:muiIn .9s var(--ease) both;animation-delay:calc(.35s + var(--k)*.12s)}
.mui-toast>div{flex:1}
.mui-dot{width:26px;height:26px;border-radius:8px;background:#0d0d0d;flex:none}
.mui-kanban{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.mui-col{background:#efede8;border-radius:12px;padding:10px}
.mui-task{position:relative;background:#fff;border-radius:10px;padding:10px 10px 18px;margin-top:8px;box-shadow:var(--hair)}
.mui-av{position:absolute;right:8px;bottom:6px;width:12px;height:12px;border-radius:50%;background:#a9a6a0}
.mui-dir{display:flex;flex-direction:column;gap:12px}
.mui-search{display:flex;align-items:center;justify-content:space-between;background:#fff;border-radius:999px;padding:6px 6px 6px 16px;box-shadow:var(--hair)}
.mui-listings{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.mui-listing{position:relative;background:#fff;border-radius:12px;padding:8px;box-shadow:var(--hair)}
.mui-thumb{display:block;height:46px;border-radius:8px;background:linear-gradient(135deg,#e2dfd9,#c9c5be)}
.mui-badge{position:absolute;top:12px;left:12px;font-size:8.5px;font-weight:700;padding:2px 7px;border-radius:999px;background:#0d0d0d;color:#fff}
.mui-table{background:#fff;border-radius:14px;box-shadow:var(--hair);padding:6px 14px;align-self:start}
.mui-row{display:grid;grid-template-columns:1fr 1fr 28px;gap:12px;align-items:center;padding:9px 0;border-bottom:1px solid var(--line)}
.mui-row:last-child{border-bottom:0}
.mui-row.head span{font:500 9.5px/1 var(--font-mono);letter-spacing:.12em;text-transform:uppercase;color:#77756f}
.mui-check{justify-self:end;width:18px;height:18px;border-radius:50%;background:#0d0d0d;position:relative}
.mui-check::after{content:"";position:absolute;left:5px;top:5px;width:7px;height:4px;border-left:1.5px solid #fff;border-bottom:1.5px solid #fff;transform:rotate(-45deg)}
.mui-check.flag{background:#fff;box-shadow:inset 0 0 0 1.5px #0d0d0d}.mui-check.flag::after{display:none}
.mui-infra{display:flex;flex-direction:column;gap:8px}
.mui-svc{display:grid;grid-template-columns:14px 1fr 34%;gap:12px;align-items:center;background:#fff;border-radius:12px;padding:11px 14px;box-shadow:var(--hair)}
.mui-svc-n{font-size:11.5px;font-weight:600;color:#3a3a3a}
.mui-light{width:9px;height:9px;border-radius:50%;background:#0d0d0d;box-shadow:0 0 0 4px rgba(13,13,13,.08);animation:muiBlink 2.4s ease-in-out infinite;animation-delay:calc(var(--k)*.3s)}
.mui-spark{height:16px;background:repeating-linear-gradient(90deg,#cfcbc4 0 3px,transparent 3px 6px);-webkit-mask:linear-gradient(0deg,#000 40%,transparent 40%,transparent 60%,#000 60%);border-radius:3px}
.mui-apps{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;align-items:start}
.mui-app{background:#fff;border-radius:14px;padding:14px;box-shadow:var(--hair)}
.mui-app b{display:block;font-size:12px;margin:10px 0 4px}
.mui-icon{display:block;width:34px;height:34px;border-radius:10px;background:#0d0d0d}
.mui-app:nth-child(2) .mui-icon{background:#5f5d58}.mui-app:nth-child(3) .mui-icon{background:#a9a6a0}
@keyframes muiIn{from{opacity:0;transform:translateX(30px)}}
@keyframes muiBlink{50%{box-shadow:0 0 0 7px rgba(13,13,13,0)}}
}`;
