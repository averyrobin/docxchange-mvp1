import React, { useState } from 'react';

const DocXchangeStructuredPrototype = () => {
  const [currentView, setCurrentView] = useState('home');
  const [expandedApp, setExpandedApp] = useState(null);
  const [uploadingDoc, setUploadingDoc] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragOverDoc, setDragOverDoc] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [demoState, setDemoState] = useState('fresh');
  const [docStatuses, setDocStatuses] = useState({});
  const [previewDoc, setPreviewDoc] = useState(null);
  const [nudgeData, setNudgeData] = useState(null);

  const applications = [
    { id: 'onboarding', name: 'Business Onboarding', date: 'Started Jan 15, 2026', taskCount: 3 },
    { id: 'cre-loan', name: 'CRE Loan', date: 'Started Feb 1, 2026', taskCount: 2 },
    { id: 'loc', name: 'Line of Credit', date: 'Started Jan 28, 2026', taskCount: 0 },
  ];

  const requestedDocs = [
    { id: 'articles', name: 'Articles of Incorporation', description: 'Current filing', entity: 'Port City Coffee', entityIcon: '\u{1F3E2}', context: 'Relationship', contextDetail: 'Business Entity' },
    { id: 'financial-stmt', name: 'Business Financial Statements', description: 'Year ending 2024', entity: 'Port City Coffee', entityIcon: '\u{1F3E2}', context: 'Relationship', contextDetail: 'Business Entity' },
    { id: 'tax-return-biz-2024', name: 'Business Tax Return', description: '2024 (or extension if filed)', entity: 'Port City Coffee', entityIcon: '\u{1F3E2}', context: 'Relationship', contextDetail: 'Business Entity' },
    { id: 'tax-return-biz-2023', name: 'Business Tax Return', description: '2023', entity: 'Port City Coffee', entityIcon: '\u{1F3E2}', context: 'Relationship', contextDetail: 'Business Entity' },
    { id: 'tax-return-biz-2022', name: 'Business Tax Return', description: '2022', entity: 'Port City Coffee', entityIcon: '\u{1F3E2}', context: 'Relationship', contextDetail: 'Business Entity' },
    { id: 'bank-stmts', name: 'Bank Statements', description: 'Oct \u2013 Dec 2024 (last 3 months)', entity: 'Port City Coffee', entityIcon: '\u{1F3E2}', context: 'Relationship', contextDetail: 'Business Entity' },
    { id: 'drivers-license', name: 'Government-Issued Photo ID', description: 'Valid, non-expired', entity: 'Lilliana Jacobs', entityIcon: '\u{1F464}', context: 'Relationship', contextDetail: 'Beneficial Owner' },
    { id: 'personal-tax-2024', name: 'Personal Tax Return', description: '2024 (or extension if filed)', entity: 'Lilliana Jacobs', entityIcon: '\u{1F464}', context: 'Relationship', contextDetail: 'Beneficial Owner' },
    { id: 'personal-tax-2023', name: 'Personal Tax Return', description: '2023', entity: 'Lilliana Jacobs', entityIcon: '\u{1F464}', context: 'Relationship', contextDetail: 'Beneficial Owner' },
    { id: 'purchase-agreement', name: 'Purchase & Sale Agreement', description: 'Fully executed copy', entity: 'CRE Loan \u2014 Port City Coffee', entityIcon: '\u{1F4CB}', context: 'Loan', contextDetail: 'CRE Loan #2026-0134' },
    { id: 'rent-roll', name: 'Rent Roll', description: 'Current as of Jan 2026', entity: 'CRE Loan \u2014 Port City Coffee', entityIcon: '\u{1F4CB}', context: 'Loan', contextDetail: 'CRE Loan #2026-0134' },
    { id: 'env-report', name: 'Phase I Environmental Report', description: 'Within last 12 months', entity: 'CRE Loan \u2014 Port City Coffee', entityIcon: '\u{1F4CB}', context: 'Loan', contextDetail: 'CRE Loan #2026-0134' },
    { id: 'appraisal', name: 'Commercial Real Estate Appraisal', description: 'Within last 12 months', entity: '123 Main St, Wilmington NC', entityIcon: '\u{1F3D7}\uFE0F', context: 'Collateral', contextDetail: 'Property \u2014 123 Main St' },
    { id: 'title-report', name: 'Title Report', description: 'Current commitment', entity: '123 Main St, Wilmington NC', entityIcon: '\u{1F3D7}\uFE0F', context: 'Collateral', contextDetail: 'Property \u2014 123 Main St' },
    { id: 'insurance-cert', name: 'Property Insurance Certificate', description: 'Coverage through 2026', entity: '123 Main St, Wilmington NC', entityIcon: '\u{1F3D7}\uFE0F', context: 'Collateral', contextDetail: 'Property \u2014 123 Main St' },
  ];

  const simulatedFileNames = {};
  const fileData = [
    ['articles','AO_PortCity.pdf','1.2 MB'],['financial-stmt','PCC_Financials_2024.pdf','3.4 MB'],
    ['tax-return-biz-2024','BusinessTaxReturn2024.pdf','2.1 MB'],['tax-return-biz-2023','BusinessTaxReturn2023.pdf','1.9 MB'],
    ['tax-return-biz-2022','BusinessTaxReturn2022.pdf','1.7 MB'],['bank-stmts','Chase_Statements_Q4.pdf','890 KB'],
    ['drivers-license','Lilliana_DL.jpg','842 KB'],['personal-tax-2024','1040_Jacobs_2024.pdf','1.8 MB'],
    ['personal-tax-2023','1040_Jacobs_2023.pdf','1.6 MB'],['purchase-agreement','PSA_123Main.pdf','4.2 MB'],
    ['rent-roll','RentRoll_123Main.xlsx','340 KB'],['env-report','PhaseI_Environmental.pdf','8.1 MB'],
    ['appraisal','Appraisal_123Main.pdf','6.7 MB'],['title-report','TitleReport_WilmNC.pdf','2.3 MB'],
    ['insurance-cert','InsuranceCert_Property.pdf','450 KB'],
  ];
  fileData.forEach(([id,name,size]) => { simulatedFileNames[id] = { name, size, date: 'Feb 10, 2026' }; });

  const c = {
    primary: '#0B2545', primaryLight: '#134074', accent: '#13A89E', accentLight: '#E8F8F7',
    surface: '#FAFBFC', white: '#FFFFFF', text: '#1B2A4A', ts: '#5A6B8A', tm: '#8E99AE',
    border: '#E2E8F0', bl: '#F0F3F7',
    success: '#10B981', sBg: '#ECFDF5', sBorder: '#A7F3D0',
    warning: '#F59E0B', wBg: '#FFFBEB', wBorder: '#FDE68A',
    error: '#EF4444', eBg: '#FEF2F2',
    pending: '#6366F1', pBg: '#EEF2FF',
    lBg: '#EFF6FF', lBorder: '#93C5FD', lAccent: '#2563EB',
    cBg: '#FFF7ED', cBorder: '#FDBA74', cAccent: '#C2410C',
  };

  const appDocs = {
    'onboarding': requestedDocs.filter(d => d.context === 'Relationship'),
    'cre-loan': requestedDocs.filter(d => d.context === 'Loan' || d.context === 'Collateral'),
    'loc': [],
  };

  const ctxC = (ctx) => {
    if (ctx === 'Loan') return { bg: c.lBg, accent: c.lAccent };
    if (ctx === 'Collateral') return { bg: c.cBg, accent: c.cAccent };
    return { bg: '#F0FDF4', accent: c.success };
  };

  const totalDocs = requestedDocs.length;
  const getDocStatus = (id) => docStatuses[id] || { status: 'pending' };
  const uploadedCount = Object.values(docStatuses).filter(s => s.status === 'uploaded').length;
  const rejectedCount = Object.values(docStatuses).filter(s => s.status === 'rejected').length;
  const pendingCount = totalDocs - uploadedCount - rejectedCount;

  const applyDemoState = (state) => {
    setDemoState(state);
    setExpandedApp(null);
    setUploadingDoc(null);
    setPreviewDoc(null);
    setNudgeData(null);

    const uploadedIds = ['articles','financial-stmt','tax-return-biz-2024','tax-return-biz-2023','tax-return-biz-2022','bank-stmts','drivers-license'];

    if (state === 'home' || state === 'fresh') {
      setCurrentView(state === 'home' ? 'home' : 'docs');
      setDocStatuses({});
    } else if (state === 'partial') {
      setCurrentView('docs');
      const s = {};
      uploadedIds.forEach(id => { s[id] = { status: 'uploaded', file: simulatedFileNames[id] }; });
      setDocStatuses(s);
    } else if (state === 'rejected') {
      setCurrentView('docs');
      const s = {};
      requestedDocs.forEach(d => { s[d.id] = { status: 'uploaded', file: simulatedFileNames[d.id] }; });
      s['financial-stmt'] = { status: 'rejected', file: simulatedFileNames['financial-stmt'], reason: 'The uploaded document is from 2022. Please provide financial statements for the year ending 2024.', rejectedBy: 'Krista Shelton', rejectedDate: 'Feb 12, 2026' };
      s['env-report'] = { status: 'rejected', file: simulatedFileNames['env-report'], reason: 'This appears to be a Phase II report, not Phase I. Please upload the Phase I Environmental Site Assessment.', rejectedBy: 'Krista Shelton', rejectedDate: 'Feb 12, 2026' };
      setDocStatuses(s);
    } else if (state === 'complete') {
      setCurrentView('docs');
      const s = {};
      requestedDocs.forEach(d => { s[d.id] = { status: 'uploaded', file: simulatedFileNames[d.id] }; });
      setDocStatuses(s);
    } else if (state === 'banker-nudge') {
      setCurrentView('banker-nudge');
      const s = {};
      uploadedIds.forEach(id => { s[id] = { status: 'uploaded', file: simulatedFileNames[id] }; });
      setDocStatuses(s);
    } else if (state === 'client-nudged') {
      setCurrentView('docs');
      const s = {};
      uploadedIds.forEach(id => { s[id] = { status: 'uploaded', file: simulatedFileNames[id] }; });
      setDocStatuses(s);
      setNudgeData({
        message: "Hi Lilliana \u2014 we're getting close to finalizing the CRE loan for Port City Coffee! I still need a few documents to move forward. Could you upload these at your earliest convenience?",
        sentBy: 'Krista Shelton', sentDate: 'Feb 12, 2026', deadline: 'Feb 21, 2026',
        urgentDocIds: ['purchase-agreement', 'appraisal', 'title-report'],
      });
    }
  };

  const simulateUpload = (docId) => {
    setUploadingDoc(docId); setUploadProgress(0);
    const iv = setInterval(() => {
      setUploadProgress(p => {
        if (p >= 100) { clearInterval(iv); setTimeout(() => {
          setDocStatuses(prev => ({ ...prev, [docId]: { status: 'uploaded', file: simulatedFileNames[docId] } }));
          setUploadingDoc(null); setUploadProgress(0); setShowToast(true); setTimeout(() => setShowToast(false), 2500);
        }, 300); return 100; }
        return p + Math.random() * 30 + 15;
      });
    }, 250);
  };

  const removeUpload = (docId) => { setDocStatuses(prev => { const n = { ...prev }; delete n[docId]; return n; }); };

  // ==================== HEADER ====================
  const Header = () => (
    <header style={{ backgroundColor: c.primary, padding: '0 24px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: `linear-gradient(135deg, ${c.accent}, #0EA5E9)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '800', color: 'white' }}>n</div>
        <span style={{ color: 'white', fontSize: '15px', fontWeight: '600' }}>First National Bank</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>Lilliana Jacobs</span>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: c.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '13px', fontWeight: '700' }}>LJ</div>
      </div>
    </header>
  );

  const StatusBadge = ({ status }) => {
    const cfg = { pending: { label: 'To Do', bg: c.pBg, color: c.pending }, uploaded: { label: 'Submitted', bg: c.sBg, color: c.success }, rejected: { label: 'Re-upload', bg: c.eBg, color: c.error } }[status] || { label: 'To Do', bg: c.pBg, color: c.pending };
    return <span style={{ padding: '3px 9px', borderRadius: '16px', fontSize: '11px', fontWeight: '600', backgroundColor: cfg.bg, color: cfg.color }}>{cfg.label}</span>;
  };

  // ==================== HOME DASHBOARD ====================
  const HomeView = () => (
    <div style={{ minHeight: 'calc(100vh - 56px)' }}>
      <div style={{ backgroundColor: c.primary, padding: '40px 24px 48px', textAlign: 'center' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: `linear-gradient(135deg, ${c.accent}, #0EA5E9)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '800', color: 'white' }}>n</div>
        </div>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', margin: '0 0 4px' }}>Good morning, Lilliana</p>
        <h1 style={{ fontSize: '26px', fontWeight: '700', color: 'white', margin: 0, fontFamily: "'Instrument Serif', Georgia, serif" }}>Where would you like to continue?</h1>
      </div>
      <div style={{ maxWidth: '520px', margin: '-24px auto 0', padding: '0 20px 40px' }}>
        {applications.map(app => {
          const docs = appDocs[app.id] || [];
          const isExp = expandedApp === app.id;
          const hasDocs = docs.length > 0;
          const done = docs.filter(d => getDocStatus(d.id).status === 'uploaded').length;
          const rej = docs.filter(d => getDocStatus(d.id).status === 'rejected').length;
          const pend = docs.length - done - rej;
          return (
            <div key={app.id} style={{ borderRadius: '12px', overflow: 'hidden', backgroundColor: c.white, border: `1px solid ${rej > 0 ? '#FECACA' : c.border}`, marginBottom: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div onClick={() => hasDocs && setExpandedApp(isExp ? null : app.id)} style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: hasDocs ? 'pointer' : 'default', borderBottom: isExp ? `1px solid ${c.bl}` : 'none' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                    <p style={{ fontSize: '15px', fontWeight: '600', color: c.text, margin: 0 }}>{app.name}</p>
                    {pend > 0 && <span style={{ backgroundColor: c.error, color: 'white', fontSize: '10px', fontWeight: '700', padding: '2px 7px', borderRadius: '8px' }}>{pend} Docs</span>}
                    {rej > 0 && <span style={{ backgroundColor: c.error, color: 'white', fontSize: '10px', fontWeight: '700', padding: '2px 7px', borderRadius: '8px' }}>{rej} Rejected</span>}
                    {app.taskCount > 0 && <span style={{ backgroundColor: c.pending, color: 'white', fontSize: '10px', fontWeight: '700', padding: '2px 7px', borderRadius: '8px' }}>{app.taskCount} Tasks</span>}
                    {hasDocs && pend === 0 && rej === 0 && <span style={{ backgroundColor: c.success, color: 'white', fontSize: '10px', fontWeight: '700', padding: '2px 7px', borderRadius: '8px' }}>Complete</span>}
                  </div>
                  <p style={{ fontSize: '12px', color: c.tm, margin: 0 }}>{app.date}</p>
                </div>
                <span style={{ color: c.tm, fontSize: '16px', transform: isExp ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.2s', display: 'inline-block' }}>{'\u203A'}</span>
              </div>
              {isExp && hasDocs && (
                <div style={{ padding: '4px 0' }}>
                  {['Relationship','Loan','Collateral'].map(ctx => {
                    const cd = docs.filter(d => d.context === ctx);
                    if (!cd.length) return null;
                    const cc = ctxC(ctx);
                    return (<div key={ctx}>
                      <div style={{ padding: '6px 18px', backgroundColor: cc.bg, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '10px', fontWeight: '700', color: cc.accent, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{ctx}</span>
                        <span style={{ fontSize: '10px', color: c.tm }}>{'\u00B7'} {cd.length} docs</span>
                      </div>
                      {Object.entries(cd.reduce((g,d) => { if(!g[d.entity]) g[d.entity]={icon:d.entityIcon,docs:[]}; g[d.entity].docs.push(d); return g; },{})).map(([ent,gr]) => (
                        <div key={ent} style={{ padding: '6px 18px 4px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                            <span style={{ fontSize: '13px' }}>{gr.icon}</span>
                            <span style={{ fontSize: '12px', fontWeight: '600', color: c.text }}>{ent}</span>
                          </div>
                          {gr.docs.map(doc => { const st = getDocStatus(doc.id); return (
                            <div key={doc.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '3px 0 3px 20px' }}>
                              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: st.status === 'uploaded' ? c.success : st.status === 'rejected' ? c.error : c.pending, flexShrink: 0 }} />
                              <span style={{ fontSize: '12px', color: c.ts }}>{doc.name}</span>
                              {doc.description && <span style={{ fontSize: '11px', color: c.tm }}>{'\u2014'} {doc.description}</span>}
                              <span style={{ fontSize: '10px', fontWeight: '500', marginLeft: 'auto', color: st.status === 'uploaded' ? c.success : st.status === 'rejected' ? c.error : c.pending }}>
                                {st.status === 'uploaded' ? 'Done' : st.status === 'rejected' ? 'Re-upload' : 'To Do'}
                              </span>
                            </div>
                          ); })}
                        </div>
                      ))}
                    </div>);
                  })}
                  <div style={{ padding: '10px 18px', borderTop: `1px solid ${c.bl}` }}>
                    <button onClick={e => { e.stopPropagation(); setCurrentView('docs'); }} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: `1px dashed ${c.accent}`, backgroundColor: c.accentLight, color: c.accent, fontSize: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>{'\u2191'} Upload documents</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <div onClick={() => setCurrentView('docs')} style={{ borderRadius: '12px', padding: '16px 18px', backgroundColor: c.white, border: `1px solid ${rejectedCount > 0 ? '#FECACA' : c.border}`, cursor: 'pointer', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
              <p style={{ fontSize: '15px', fontWeight: '600', color: c.text, margin: 0 }}>Documents</p>
              {(pendingCount + rejectedCount) > 0 && <span style={{ backgroundColor: c.error, color: 'white', fontSize: '10px', fontWeight: '700', padding: '2px 7px', borderRadius: '8px' }}>{pendingCount + rejectedCount} To Do</span>}
              {pendingCount === 0 && rejectedCount === 0 && <span style={{ backgroundColor: c.success, color: 'white', fontSize: '10px', fontWeight: '700', padding: '2px 7px', borderRadius: '8px' }}>Complete</span>}
            </div>
            <p style={{ fontSize: '12px', color: c.tm, margin: 0 }}>{uploadedCount} of {totalDocs} submitted{rejectedCount > 0 ? ` \u00B7 ${rejectedCount} needs attention` : ''}</p>
          </div>
          <span style={{ color: c.tm, fontSize: '20px' }}>{'\u203A'}</span>
        </div>
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <p style={{ fontSize: '11px', color: c.tm, margin: '0 0 2px' }}>Privacy Policy | Terms & Conditions</p>
          <p style={{ fontSize: '11px', color: c.tm, margin: 0 }}>Powered by <strong>nCino</strong></p>
        </div>
      </div>
    </div>
  );

  // ==================== DOCUMENT LIST VIEW ====================
  const DocsView = () => {
    const [expandedEntities, setExpandedEntities] = useState({});
    const toggleEntity = (key) => setExpandedEntities(p => ({ ...p, [key]: !p[key] }));
    const isOpen = (key) => expandedEntities[key] !== false;

    return (
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '28px 20px' }}>
        <button onClick={() => setCurrentView('home')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', padding: '4px 0', fontSize: '13px', color: c.ts, cursor: 'pointer', marginBottom: '16px' }}>{'\u2190'} Back to home</button>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: c.text, margin: '0 0 6px', fontFamily: "'Instrument Serif', Georgia, serif" }}>Your documents</h1>
        <p style={{ fontSize: '14px', color: c.ts, margin: '0 0 20px' }}>{uploadedCount} of {totalDocs} submitted{rejectedCount > 0 ? ` \u00B7 ${rejectedCount} needs re-upload` : pendingCount === 0 ? ' \u2014 all done!' : ''}</p>

        <div style={{ height: '4px', borderRadius: '2px', backgroundColor: c.bl, marginBottom: '20px', overflow: 'hidden' }}>
          <div style={{ height: '100%', borderRadius: '2px', backgroundColor: rejectedCount > 0 ? c.warning : c.accent, width: `${(uploadedCount / totalDocs) * 100}%`, transition: 'width 0.4s' }} />
        </div>

        {/* Nudge Banner */}
        {nudgeData && (
          <div style={{ borderRadius: '12px', border: `1px solid ${c.wBorder}`, backgroundColor: c.wBg, overflow: 'hidden', marginBottom: '20px' }}>
            <div style={{ padding: '10px 18px', backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${c.wBorder}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px' }}>{'\u23F0'}</span>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#92400E' }}>Deadline: {nudgeData.deadline}</span>
              </div>
              <span style={{ fontSize: '12px', color: '#92400E', fontWeight: '500' }}>8 days remaining</span>
            </div>
            <div style={{ padding: '14px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: c.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '11px', fontWeight: '700', flexShrink: 0 }}>KS</div>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: '600', color: '#92400E', margin: 0 }}>{nudgeData.sentBy}</p>
                  <p style={{ fontSize: '11px', color: '#B45309', margin: 0 }}>{nudgeData.sentDate}</p>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: '#78350F', margin: 0, lineHeight: '1.5', paddingLeft: '42px' }}>{nudgeData.message}</p>
            </div>
            {nudgeData.urgentDocIds && nudgeData.urgentDocIds.length > 0 && (
              <div style={{ padding: '10px 18px', borderTop: `1px solid ${c.wBorder}`, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px' }}>{'\u26A1'}</span>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#92400E' }}>{nudgeData.urgentDocIds.length} documents marked as urgent</span>
              </div>
            )}
          </div>
        )}

        {/* Rejected alert */}
        {rejectedCount > 0 && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px 18px', borderRadius: '10px', backgroundColor: c.eBg, border: '1px solid #FECACA', marginBottom: '20px' }}>
            <span style={{ fontSize: '18px', lineHeight: 1, flexShrink: 0 }}>{'\u26A0'}</span>
            <div>
              <p style={{ fontSize: '14px', fontWeight: '600', color: c.error, margin: '0 0 2px' }}>{rejectedCount} document{rejectedCount > 1 ? 's' : ''} needs re-upload</p>
              <p style={{ fontSize: '13px', color: '#B91C1C', margin: 0 }}>Your banker has provided feedback below.</p>
            </div>
          </div>
        )}

        {/* Documents by context with accordion */}
        {['Relationship','Loan','Collateral'].map(ctx => {
          const docs = requestedDocs.filter(d => d.context === ctx);
          if (!docs.length) return null;
          const cc = ctxC(ctx);
          const ctxUp = docs.filter(d => getDocStatus(d.id).status === 'uploaded').length;
          const ctxRej = docs.filter(d => getDocStatus(d.id).status === 'rejected').length;

          return (
            <div key={ctx} style={{ marginBottom: '14px', borderRadius: '12px', border: `1px solid ${ctxRej > 0 ? '#FECACA' : c.border}`, backgroundColor: c.white, overflow: 'hidden' }}>
              <div style={{ padding: '10px 18px', backgroundColor: cc.bg, borderBottom: `1px solid ${c.bl}`, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: cc.accent, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{ctx} Documents</span>
                <span style={{ fontSize: '11px', color: c.tm }}>{'\u00B7'} {ctxUp}/{docs.length} submitted</span>
              </div>

              {Object.entries(docs.reduce((g,d) => { if(!g[d.entity]) g[d.entity]={icon:d.entityIcon,detail:d.contextDetail,docs:[]}; g[d.entity].docs.push(d); return g; },{})).map(([entity, group]) => {
                const ek = `${ctx}-${entity}`;
                const open = isOpen(ek);
                const eu = group.docs.filter(d => getDocStatus(d.id).status === 'uploaded').length;
                const er = group.docs.filter(d => getDocStatus(d.id).status === 'rejected').length;
                const ep = group.docs.length - eu - er;
                const eUrg = nudgeData && nudgeData.urgentDocIds ? group.docs.filter(d => nudgeData.urgentDocIds.includes(d.id) && getDocStatus(d.id).status === 'pending').length : 0;
                const allDone = ep === 0 && er === 0;

                return (
                  <div key={entity}>
                    <div onClick={() => toggleEntity(ek)} style={{ padding: '10px 18px', backgroundColor: '#FAFBFC', borderBottom: `1px solid ${c.bl}`, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', userSelect: 'none' }}>
                      <span style={{ color: c.tm, fontSize: '14px', transform: open ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.2s', display: 'inline-block' }}>{'\u203A'}</span>
                      <span style={{ fontSize: '14px' }}>{group.icon}</span>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: c.text, flex: 1 }}>{entity}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {eUrg > 0 && <span style={{ fontSize: '10px', fontWeight: '600', color: '#D97706', backgroundColor: '#FEF3C7', padding: '2px 7px', borderRadius: '8px', border: '1px solid #FDE68A' }}>{'\u26A1'} {eUrg} urgent</span>}
                        {er > 0 && <span style={{ fontSize: '10px', fontWeight: '600', color: c.error, backgroundColor: c.eBg, padding: '2px 7px', borderRadius: '8px' }}>{er} rejected</span>}
                        {ep > 0 && eUrg === 0 && <span style={{ fontSize: '10px', fontWeight: '600', color: c.pending, backgroundColor: c.pBg, padding: '2px 7px', borderRadius: '8px' }}>{ep} to do</span>}
                        {allDone && <span style={{ fontSize: '10px', fontWeight: '600', color: c.success, backgroundColor: c.sBg, padding: '2px 7px', borderRadius: '8px' }}>{eu}/{group.docs.length} done</span>}
                      </div>
                    </div>

                    {open && group.docs.map((doc, idx) => {
                      const st = getDocStatus(doc.id);
                      const isUpl = uploadingDoc === doc.id;
                      const isDO = dragOverDoc === doc.id;
                      const isUrg = nudgeData && nudgeData.urgentDocIds && nudgeData.urgentDocIds.includes(doc.id) && st.status === 'pending';

                      return (
                        <div key={doc.id} style={{ borderBottom: idx < group.docs.length - 1 ? `1px solid ${c.bl}` : 'none' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 18px 12px 46px' }}>
                            <div style={{ width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '12px', fontWeight: '700',
                              backgroundColor: st.status === 'uploaded' ? c.sBg : st.status === 'rejected' ? c.eBg : isUrg ? '#FEF3C7' : c.pBg,
                              color: st.status === 'uploaded' ? c.success : st.status === 'rejected' ? c.error : isUrg ? '#D97706' : c.pending,
                              border: isUrg ? '2px solid #F59E0B' : 'none',
                            }}>{st.status === 'uploaded' ? '\u2713' : st.status === 'rejected' ? '!' : isUrg ? '\u26A1' : '\u25CB'}</div>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                                <p style={{ fontSize: '14px', fontWeight: '500', color: c.text, margin: 0 }}>{doc.name}</p>
                                {doc.description && <span style={{ fontSize: '11px', color: c.tm }}>{'\u2014'} {doc.description}</span>}
                              </div>
                              {st.status === 'uploaded' && st.file && <p style={{ fontSize: '12px', color: c.success, margin: '1px 0 0' }}>{st.file.name} {'\u00B7'} {st.file.size}</p>}
                              {st.status === 'rejected' && st.file && <p style={{ fontSize: '12px', color: c.error, margin: '1px 0 0' }}>Rejected {'\u00B7'} {st.file.name}</p>}
                              {isUrg && <p style={{ fontSize: '11px', color: '#D97706', fontWeight: '500', margin: '2px 0 0' }}>Urgent {'\u2014'} requested by {nudgeData.sentBy}</p>}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              {isUrg && <span style={{ fontSize: '10px', fontWeight: '600', color: '#D97706', backgroundColor: '#FEF3C7', padding: '2px 7px', borderRadius: '8px', border: '1px solid #FDE68A' }}>Urgent</span>}
                              <StatusBadge status={st.status} />
                            </div>
                          </div>

                          {st.status === 'rejected' && (
                            <div style={{ padding: '0 18px 12px 46px' }}>
                              <div style={{ padding: '10px 14px', borderRadius: '8px', backgroundColor: c.eBg, borderLeft: `3px solid ${c.error}`, marginBottom: '10px' }}>
                                <p style={{ fontSize: '12px', fontWeight: '600', color: c.error, margin: '0 0 4px' }}>Reason from {st.rejectedBy} {'\u00B7'} {st.rejectedDate}</p>
                                <p style={{ fontSize: '13px', color: '#991B1B', margin: 0, lineHeight: '1.5' }}>{st.reason}</p>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderRadius: '8px', backgroundColor: '#FEF2F2', border: '1px dashed #FECACA', marginBottom: '10px' }}>
                                <span style={{ fontSize: '14px' }}>{'\u{1F4C4}'}</span>
                                <p style={{ fontSize: '12px', color: '#991B1B', margin: 0 }}><span style={{ textDecoration: 'line-through' }}>{st.file.name}</span> <em>{'\u2014'} rejected</em></p>
                              </div>
                            </div>
                          )}

                          {(st.status === 'pending' || st.status === 'rejected') && (
                            <div style={{ padding: '0 18px 14px 46px' }}>
                              {isUpl ? (
                                <div style={{ padding: '16px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: `1px solid ${c.border}`, textAlign: 'center' }}>
                                  <div style={{ height: '6px', borderRadius: '3px', backgroundColor: c.bl, marginBottom: '10px', overflow: 'hidden' }}>
                                    <div style={{ height: '100%', borderRadius: '3px', backgroundColor: c.accent, width: `${Math.min(uploadProgress, 100)}%`, transition: 'width 0.2s' }} />
                                  </div>
                                  <p style={{ fontSize: '12px', color: c.ts, margin: 0 }}>Uploading... {Math.min(Math.round(uploadProgress), 100)}%</p>
                                </div>
                              ) : (
                                <div onDragOver={e => { e.preventDefault(); setDragOverDoc(doc.id); }} onDragLeave={() => setDragOverDoc(null)} onDrop={e => { e.preventDefault(); setDragOverDoc(null); simulateUpload(doc.id); }} onClick={() => simulateUpload(doc.id)}
                                  style={{ padding: '18px', borderRadius: '10px', border: `2px dashed ${isDO ? c.accent : c.border}`, backgroundColor: isDO ? c.accentLight : '#FAFBFC', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
                                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: isDO ? c.accentLight : c.pBg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px', fontSize: '14px' }}>{'\u2191'}</div>
                                  <p style={{ fontSize: '13px', fontWeight: '500', color: c.text, margin: '0 0 2px' }}>{st.status === 'rejected' ? 'Upload corrected version' : 'Drop file or click to browse'}</p>
                                  <p style={{ fontSize: '11px', color: c.tm, margin: 0 }}>PDF, JPG, PNG {'\u00B7'} Up to 10 MB</p>
                                </div>
                              )}
                            </div>
                          )}

                          {st.status === 'uploaded' && (
                            <div style={{ padding: '0 18px 12px 46px' }}>
                              <div onClick={() => setPreviewDoc({ doc, file: st.file })} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderRadius: '8px', backgroundColor: '#F8FAFC', cursor: 'pointer' }}>
                                <span style={{ fontSize: '14px' }}>{'\u{1F4C4}'}</span>
                                <div style={{ flex: 1 }}>
                                  <p style={{ fontSize: '12px', fontWeight: '500', color: c.accent, margin: 0, textDecoration: 'underline' }}>{st.file.name}</p>
                                  <p style={{ fontSize: '11px', color: c.tm, margin: '1px 0 0' }}>{st.file.size} {'\u00B7'} Uploaded {st.file.date} {'\u00B7'} Click to preview</p>
                                </div>
                                <button onClick={(e) => { e.stopPropagation(); removeUpload(doc.id); }} style={{ background: 'none', border: `1px solid ${c.border}`, borderRadius: '6px', padding: '4px 9px', fontSize: '11px', color: c.error, cursor: 'pointer' }}>Remove</button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}

        <div style={{ marginTop: '24px', padding: '14px 18px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: `1px solid ${c.bl}`, display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: c.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px', fontWeight: '700' }}>KS</div>
          <div>
            <p style={{ fontSize: '13px', fontWeight: '600', color: c.text, margin: 0 }}>Questions? Contact your banker</p>
            <p style={{ fontSize: '12px', color: c.ts, margin: 0 }}>Krista Shelton {'\u00B7'} krista.shelton@firstnationalbank.com</p>
          </div>
        </div>
      </div>
    );
  };

  // ==================== BANKER NUDGE VIEW (DocMan Style) ====================
  const BankerNudgeView = () => {
    const [selDocs, setSelDocs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [urgDocs, setUrgDocs] = useState([]);
    const [msg, setMsg] = useState("Hi Lilliana \u2014 we're getting close to finalizing the CRE loan for Port City Coffee! I still need a few documents to move forward. Could you upload these at your earliest convenience?");
    const [dl, setDl] = useState('2026-02-21');
    const [sent, setSent] = useState(false);
    const [filter, setFilter] = useState('all');

    const sf = { blue: '#0176d3', blueLight: '#eef4ff', text: '#080707', ts: '#706e6b', tm: '#969492', border: '#e5e5e5', bg: '#f3f3f3', white: '#FFFFFF', grayBg: '#f3f3f3', yellow: '#fe9339' };

    const allDocs = requestedDocs.map(d => ({
      ...d, displayStatus: docStatuses[d.id] && docStatuses[d.id].status === 'uploaded' ? 'IN-FILE' : 'OPEN',
      category: d.context === 'Relationship' ? (d.entity === 'Port City Coffee' ? 'Business Documentation' : 'Individual Specific Documents') : d.context === 'Loan' ? 'Loan Documentation' : 'Collateral Documentation',
      lastMod: docStatuses[d.id] && docStatuses[d.id].file ? docStatuses[d.id].file.date : '2/9/2026',
    }));

    const filtered = filter === 'all' ? allDocs : filter === 'portal' ? allDocs.filter(d => d.displayStatus === 'OPEN') : allDocs.filter(d => d.category === filter);
    const categories = [...new Set(allDocs.map(d => d.category))];
    const portalCount = allDocs.filter(d => d.displayStatus === 'OPEN').length;

    if (sent) return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: c.sBg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '24px', color: c.success }}>{'\u2713'}</div>
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: c.text, margin: '0 0 8px' }}>Reminder sent to Lilliana Jacobs</h2>
        <p style={{ fontSize: '14px', color: c.ts, margin: '0 0 24px' }}>{selDocs.length} documents {'\u00B7'} {urgDocs.filter(id => selDocs.includes(id)).length} urgent {'\u00B7'} Deadline: {new Date(dl).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
        <button onClick={() => applyDemoState('client-nudged')} style={{ backgroundColor: sf.blue, color: 'white', border: 'none', borderRadius: '4px', padding: '10px 20px', fontSize: '14px', cursor: 'pointer' }}>See client's view {'\u2192'}</button>
      </div>
    );

    return (
      <div style={{ fontFamily: 'Salesforce Sans, Arial, sans-serif', backgroundColor: sf.bg, minHeight: 'calc(100vh - 100px)' }}>
        <div style={{ backgroundColor: sf.white, padding: '12px 24px', borderBottom: `1px solid ${sf.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ width: '36px', height: '36px', backgroundColor: '#7F8DE1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 52 52" fill="white"><path d="M26 2C12.7 2 2 12.7 2 26s10.7 24 24 24 24-10.7 24-24S39.3 2 26 2zm0 36c-6.6 0-12-5.4-12-12s5.4-12 12-12 12 5.4 12 12-5.4 12-12 12z"/></svg>
            </div>
            <div><p style={{ fontSize: '11px', color: sf.ts, margin: 0 }}>Relationship</p><h2 style={{ fontSize: '18px', fontWeight: '700', color: sf.text, margin: 0 }}>Port City Coffee</h2></div>
          </div>
          <div style={{ display: 'flex', gap: '24px', fontSize: '12px', color: sf.ts }}>
            <span>Relationship Type: <strong style={{ color: sf.text }}>LLC</strong></span>
            <span>Status: <strong style={{ color: sf.text }}>Prospect</strong></span>
            <span>Relationship Owner: <span style={{ color: sf.blue }}>Krista Shelton</span></span>
          </div>
        </div>
        <div style={{ backgroundColor: sf.white, borderBottom: `1px solid ${sf.border}`, padding: '0 24px', display: 'flex' }}>
          {['Details','Products & Services','Credit Resources','Document Manager','Credit Actions','Collaboration','Review'].map(tab => (
            <div key={tab} style={{ padding: '10px 16px', fontSize: '13px', cursor: 'pointer', color: tab === 'Document Manager' ? sf.blue : sf.text, fontWeight: tab === 'Document Manager' ? '700' : '400', borderBottom: tab === 'Document Manager' ? `3px solid ${sf.blue}` : '3px solid transparent', marginBottom: '-1px' }}>{tab}</div>
          ))}
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '220px', backgroundColor: sf.white, borderRight: `1px solid ${sf.border}`, padding: '16px 0', minHeight: '500px' }}>
            <div style={{ padding: '0 16px' }}>
              {[{ key: 'all', label: 'All Documents', ct: allDocs.length }, { key: 'portal', label: 'Customer Portal', ct: portalCount }, { key: 'esign', label: 'E-Signature', ct: 0 }].map(item => (
                <div key={item.key} onClick={() => setFilter(item.key)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', cursor: 'pointer', borderRadius: '4px', backgroundColor: filter === item.key ? sf.blueLight : 'transparent', marginBottom: '2px' }}>
                  <span style={{ fontSize: '13px', color: filter === item.key ? sf.blue : sf.text, fontWeight: filter === item.key ? '600' : '400' }}>{item.label}</span>
                  <span style={{ fontSize: '12px', color: sf.ts }}>{item.ct}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: '12px 16px', marginTop: '8px' }}>
              <div style={{ padding: '8px 12px', borderRadius: '4px', border: `1px solid ${sf.border}`, textAlign: 'center', fontSize: '13px', color: sf.blue, cursor: 'pointer' }}>{'\u2726'} File Staging (0)</div>
            </div>
            <div style={{ padding: '16px 16px 0', borderTop: `1px solid ${sf.border}`, marginTop: '8px' }}>
              <p style={{ fontSize: '10px', fontWeight: '700', color: sf.ts, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px' }}>Filter by Categories</p>
              {categories.map(cat => (
                <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0', cursor: 'pointer', fontSize: '12px', color: sf.text }}>
                  <input type="checkbox" checked={filter === cat} onChange={() => setFilter(filter === cat ? 'all' : cat)} style={{ accentColor: sf.blue }} />{cat}
                </label>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, padding: '16px 24px' }}>
            <div style={{ marginBottom: '12px', padding: '8px 12px', borderRadius: '4px', border: `1px solid ${sf.border}`, backgroundColor: sf.white, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="14" height="14" viewBox="0 0 52 52" fill={sf.ts}><path d="M50.4 47.2L37.9 34.7c2.9-3.7 4.6-8.4 4.6-13.5C42.5 9.5 33 0 21.3 0S0 9.5 0 21.2s9.5 21.3 21.3 21.3c5.1 0 9.8-1.7 13.5-4.6l12.5 12.5c.4.4 1 .6 1.6.6s1.2-.2 1.6-.6c.8-.9.8-2.3-.1-3.2z"/></svg>
              <span style={{ color: sf.tm, fontSize: '13px' }}>Search by document name or details.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button style={{ padding: '6px 14px', borderRadius: '4px', border: `1px solid ${sf.border}`, backgroundColor: sf.white, fontSize: '13px', color: sf.text, cursor: 'pointer' }}>Actions {'\u25BE'}</button>
                <span style={{ fontSize: '13px', color: sf.ts }}>{selDocs.length} of {filtered.length} Items Selected</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{ padding: '6px 14px', borderRadius: '4px', border: `1px solid ${sf.blue}`, backgroundColor: sf.white, fontSize: '13px', color: sf.blue, cursor: 'pointer' }}>Add Placeholder</button>
                <button style={{ padding: '6px 14px', borderRadius: '4px', border: `1px solid ${sf.blue}`, backgroundColor: sf.white, fontSize: '13px', color: sf.blue, cursor: 'pointer' }}>Upload Files</button>
                <button onClick={() => selDocs.length > 0 && setShowModal(true)} style={{ padding: '6px 14px', borderRadius: '4px', border: 'none', backgroundColor: selDocs.length > 0 ? sf.blue : sf.border, fontSize: '13px', color: 'white', cursor: selDocs.length > 0 ? 'pointer' : 'default' }}>Send Reminder ({selDocs.length})</button>
              </div>
            </div>
            <div style={{ backgroundColor: sf.white, borderRadius: '4px', border: `1px solid ${sf.border}`, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '36px 100px 1fr 80px 180px 100px 28px', padding: '8px 12px', borderBottom: `2px solid ${sf.border}`, alignItems: 'center' }}>
                <input type="checkbox" checked={selDocs.length === filtered.length && filtered.length > 0} onChange={() => setSelDocs(selDocs.length === filtered.length ? [] : filtered.map(d => d.id))} style={{ accentColor: sf.blue, cursor: 'pointer' }} />
                <span style={{ fontSize: '11px', fontWeight: '700', color: sf.ts, textTransform: 'uppercase' }}>Status</span>
                <span style={{ fontSize: '11px', fontWeight: '700', color: sf.ts, textTransform: 'uppercase' }}>Name {'\u2191'}</span>
                <span style={{ fontSize: '11px', fontWeight: '700', color: sf.ts, textTransform: 'uppercase' }}>Year</span>
                <span style={{ fontSize: '11px', fontWeight: '700', color: sf.ts, textTransform: 'uppercase' }}>Category</span>
                <span style={{ fontSize: '11px', fontWeight: '700', color: sf.ts, textTransform: 'uppercase' }}>Modified</span>
                <span></span>
              </div>
              {filtered.map((doc, idx) => {
                const isSel = selDocs.includes(doc.id);
                return (
                  <div key={doc.id} style={{ display: 'grid', gridTemplateColumns: '36px 100px 1fr 80px 180px 100px 28px', padding: '10px 12px', borderBottom: idx < filtered.length - 1 ? `1px solid ${sf.border}` : 'none', alignItems: 'center', backgroundColor: isSel ? sf.blueLight : sf.white }}>
                    <input type="checkbox" checked={isSel} onChange={() => setSelDocs(p => p.includes(doc.id) ? p.filter(x => x !== doc.id) : [...p, doc.id])} style={{ accentColor: sf.blue, cursor: 'pointer' }} />
                    <span style={{ display: 'inline-flex', padding: '2px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', backgroundColor: doc.displayStatus === 'IN-FILE' ? sf.yellow : sf.white, color: doc.displayStatus === 'IN-FILE' ? sf.white : sf.text, border: `1px solid ${doc.displayStatus === 'IN-FILE' ? sf.yellow : sf.border}` }}>{doc.displayStatus} {'\u25BE'}</span>
                    <span style={{ fontSize: '13px', color: sf.blue, cursor: 'pointer' }}>{doc.name}</span>
                    <span style={{ fontSize: '13px', color: sf.text }}>{doc.description && doc.description.match(/\d{4}/) ? doc.description.match(/\d{4}/)[0] : ''}</span>
                    <span style={{ fontSize: '12px', color: sf.text }}>{doc.category}</span>
                    <span style={{ fontSize: '12px', color: sf.text }}>{doc.lastMod}</span>
                    <span style={{ fontSize: '16px', color: sf.ts, cursor: 'pointer' }}>{'\u203A'}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {showModal && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9000 }}>
            <div style={{ backgroundColor: sf.white, borderRadius: '8px', width: '100%', maxWidth: '560px', maxHeight: '80vh', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: `1px solid ${sf.border}` }}>
                <div><h2 style={{ fontSize: '18px', fontWeight: '700', color: sf.text, margin: 0 }}>Send Document Reminder</h2><p style={{ fontSize: '12px', color: sf.ts, margin: '2px 0 0' }}>Remind client to upload outstanding documents</p></div>
                <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '20px', color: sf.ts, cursor: 'pointer' }}>{'\u00D7'}</button>
              </div>
              <div style={{ padding: '16px 20px', maxHeight: '50vh', overflowY: 'auto' }}>
                <div style={{ marginBottom: '16px' }}>
                  <p style={{ fontSize: '12px', fontWeight: '700', color: sf.text, margin: '0 0 6px' }}>Send to:</p>
                  <div style={{ padding: '8px 12px', borderRadius: '4px', border: `1px solid ${sf.border}`, backgroundColor: sf.grayBg, fontSize: '13px' }}>Lilliana Jacobs {'\u00B7'} lilliana.jacobs@portcitycoffee.com</div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <p style={{ fontSize: '12px', fontWeight: '700', color: sf.text, margin: '0 0 6px' }}>Selected Documents ({selDocs.length})</p>
                  <div style={{ border: `1px solid ${sf.border}`, borderRadius: '4px', overflow: 'hidden' }}>
                    {selDocs.map((docId, idx) => {
                      const doc = requestedDocs.find(d => d.id === docId);
                      if (!doc) return null;
                      const isUrg = urgDocs.includes(docId);
                      return (
                        <div key={docId} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderBottom: idx < selDocs.length - 1 ? `1px solid ${sf.border}` : 'none', backgroundColor: isUrg ? '#FFFBEB' : sf.white }}>
                          <span style={{ fontSize: '14px' }}>{doc.entityIcon}</span>
                          <div style={{ flex: 1 }}><p style={{ fontSize: '13px', color: sf.text, margin: 0 }}>{doc.name}</p>{doc.description && <p style={{ fontSize: '11px', color: sf.tm, margin: 0 }}>{doc.description} {'\u00B7'} {doc.entity}</p>}</div>
                          <button onClick={() => setUrgDocs(p => p.includes(docId) ? p.filter(x => x !== docId) : [...p, docId])} style={{ background: 'none', border: `1px solid ${isUrg ? '#FDE68A' : sf.border}`, borderRadius: '4px', padding: '3px 8px', fontSize: '10px', fontWeight: '600', color: isUrg ? '#D97706' : sf.tm, cursor: 'pointer', backgroundColor: isUrg ? '#FEF3C7' : 'transparent' }}>{isUrg ? '\u26A1 Urgent' : 'Mark urgent'}</button>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <p style={{ fontSize: '12px', fontWeight: '700', color: sf.text, margin: '0 0 6px' }}>Deadline</p>
                  <input type="date" value={dl} onChange={e => setDl(e.target.value)} style={{ padding: '8px 12px', borderRadius: '4px', border: `1px solid ${sf.border}`, fontSize: '13px', width: '200px' }} />
                </div>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: '700', color: sf.text, margin: '0 0 6px' }}>Message to client (optional)</p>
                  <textarea value={msg} onChange={e => setMsg(e.target.value)} rows={3} style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: `1px solid ${sf.border}`, fontSize: '13px', lineHeight: '1.5', resize: 'vertical', fontFamily: 'inherit' }} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', padding: '12px 20px', borderTop: `1px solid ${sf.border}`, backgroundColor: sf.grayBg }}>
                <button onClick={() => setShowModal(false)} style={{ padding: '8px 20px', borderRadius: '4px', border: `1px solid ${sf.border}`, backgroundColor: sf.white, fontSize: '13px', cursor: 'pointer' }}>Cancel</button>
                <button onClick={() => { setShowModal(false); setSent(true); }} style={{ padding: '8px 20px', borderRadius: '4px', border: 'none', backgroundColor: sf.blue, fontSize: '13px', color: 'white', cursor: 'pointer' }}>{'\u2709'} Send Reminder</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ==================== MAIN ====================
  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", backgroundColor: c.surface, minHeight: '100vh', position: 'relative' }}>
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
      <Header />
      <div style={{ backgroundColor: '#F0F3FF', padding: '8px 24px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: `1px solid ${c.border}`, flexWrap: 'wrap' }}>
        <span style={{ fontSize: '11px', fontWeight: '700', color: c.primary, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Demo:</span>
        {[
          { key: 'home', label: 'Home Dashboard' },
          { key: 'fresh', label: 'All Pending' },
          { key: 'partial', label: 'Partial Progress' },
          { key: 'rejected', label: 'Banker Rejected' },
          { key: 'complete', label: 'All Submitted' },
          { key: 'banker-nudge', label: 'Banker: Send Nudge' },
          { key: 'client-nudged', label: 'Client: Nudge Received' },
        ].map(({ key, label }) => (
          <button key={key} onClick={() => applyDemoState(key)} style={{
            padding: '5px 12px', borderRadius: '6px',
            border: demoState === key ? `2px solid ${c.primary}` : `1px solid ${c.border}`,
            backgroundColor: demoState === key ? 'white' : '#F8FAFC',
            color: demoState === key ? c.primary : c.ts,
            fontSize: '12px', fontWeight: demoState === key ? '600' : '400', cursor: 'pointer',
          }}>{label}</button>
        ))}
      </div>

      {currentView === 'home' && <HomeView />}
      {currentView === 'docs' && <DocsView />}
      {currentView === 'banker-nudge' && <BankerNudgeView />}

      {showToast && (
        <div style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', backgroundColor: c.primary, color: 'white', padding: '12px 24px', borderRadius: '10px', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: '500', zIndex: 1000 }}>
          <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: c.success, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800' }}>{'\u2713'}</span>
          Document uploaded successfully
        </div>
      )}

      {previewDoc && (
        <div onClick={() => setPreviewDoc(null)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }}>
          <div onClick={e => e.stopPropagation()} style={{ backgroundColor: c.white, borderRadius: '12px', width: '100%', maxWidth: '600px', maxHeight: '85vh', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: `1px solid ${c.bl}`, flexShrink: 0 }}>
              <div>
                <p style={{ fontSize: '15px', fontWeight: '600', color: c.text, margin: '0 0 2px' }}>{previewDoc.doc.name}</p>
                <p style={{ fontSize: '12px', color: c.tm, margin: 0 }}>{previewDoc.file.name} {'\u00B7'} {previewDoc.file.size} {'\u00B7'} Uploaded {previewDoc.file.date}</p>
              </div>
              <button onClick={() => setPreviewDoc(null)} style={{ background: 'none', border: 'none', fontSize: '20px', color: c.tm, cursor: 'pointer' }}>{'\u00D7'}</button>
            </div>
            <div style={{ flex: 1, overflow: 'auto', padding: '24px', backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
              <div style={{ width: '100%', maxWidth: '480px', backgroundColor: 'white', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: '40px 36px', minHeight: '400px' }}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <p style={{ fontSize: '10px', color: c.tm, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Document Preview</p>
                  <p style={{ fontSize: '18px', fontWeight: '700', color: c.text, margin: '0 0 4px', fontFamily: 'serif' }}>{previewDoc.doc.name}</p>
                  {previewDoc.doc.description && <p style={{ fontSize: '13px', color: c.tm, margin: 0 }}>{previewDoc.doc.description}</p>}
                </div>
                <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: '16px' }}>
                  {[1,2,3,4,5].map(i => (
                    <div key={i} style={{ marginBottom: '12px' }}>
                      <div style={{ height: '10px', backgroundColor: c.bl, borderRadius: '4px', width: `${60 + i * 7}%`, marginBottom: '6px' }} />
                      <div style={{ height: '10px', backgroundColor: c.bl, borderRadius: '4px', width: `${40 + i * 9}%`, marginBottom: '6px' }} />
                      <div style={{ height: '10px', backgroundColor: c.bl, borderRadius: '4px', width: `${30 + i * 6}%` }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderTop: `1px solid ${c.bl}`, backgroundColor: '#F8FAFC', flexShrink: 0 }}>
              <span style={{ fontSize: '12px', color: c.success, fontWeight: '500' }}>{'\u2713'} Submitted {'\u00B7'} {previewDoc.doc.entity}</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => { removeUpload(previewDoc.doc.id); setPreviewDoc(null); }} style={{ background: 'none', border: `1px solid ${c.border}`, borderRadius: '8px', padding: '8px 16px', fontSize: '13px', color: c.error, cursor: 'pointer' }}>Remove & re-upload</button>
                <button onClick={() => setPreviewDoc(null)} style={{ backgroundColor: c.accent, color: 'white', border: 'none', borderRadius: '8px', padding: '8px 16px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocXchangeStructuredPrototype;
