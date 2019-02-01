<%@ page contentType="text/html; charset=utf-8" %>
<%@ page import="java.util.Properties"%>
<%@ page import="com.mocomsys.microstrategy.custom.esm.SSOESM"%>
<%
	//리포트
	//http://localhost:8090/MicroStrategy/_custom/jsp/sso.jsp?mstrUserId=demo1&objId=DDB4F1C14D520007E4CA4194D32A4E1D&objType=3&objSubType=768
	
	//다큐먼트
	//http://localhost:8090/MicroStrategy/_custom/jsp/sso.jsp?mstrUserId=demo1&objId=A288C8B1453C3DF1BD1844825A48F689&objType=55&objSubType=false
	//http://localhost:8090/MicroStrategy/_custom/jsp/sso.jsp?mstrUserId=demo1&objId=F2595260464B4F9029E76B80EA89B1C0&objType=55&objSubType=false
	
	
	//대시보드
	//http://localhost:8090/MicroStrategy/_custom/jsp/sso.jsp?mstrUserId=demo1&objId=51ADCEA247395F32C18EB2AAFB645DF7&objType=55&objSubType=true
	//http://localhost:8090/MicroStrategy/_custom/jsp/sso.jsp?mstrUserId=demo1&objId=24DA800E46B88205CB35D4BA0DA8FE3B&objType=55&objSubType=true
	
	String mstrUserId = request.getParameter("mstrUserId");
	String mstrUserPwd = request.getParameter("mstrUserPwd");
	
	String objId = request.getParameter("objId");
	String objType = request.getParameter("objType");
	String objSubType = request.getParameter("objSubType");
	
	session.setAttribute("mstrUserId", mstrUserId);
	//System.out.println("=> 로그인 완료" + mstrUserId);
	
	Properties prop = SSOESM.getproperties();
	
%><!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>
<script src="${pageContext.request.contextPath}/_custom/javascript/jquery/jquery-1.11.0.js" type="text/javascript"></script>
<script type="text/javascript">
	var oid 		= "<%= objId %>";
	var tp 			= "<%= objType %>";
	var subType 	= "<%= objSubType %>";
	var redirectUrl = '';
	
	
	function Init() {
	 	var mstrServer	= '&Server=' 	+ "<%= prop.getProperty("mstr.server.name") %>";
	 	var mstrProject = '&Project=' 	+ "<%= prop.getProperty("mstr.default.project.name") %>";
	 	var mstrUrlInfo = mstrServer + mstrProject;
		
		if(tp == "3") {
			//리포트
			var viewMode = '';
			
			if(subType == '768') {
				//그리드 모드
				viewMode = '1';
			} else if(subType == '769') {
				//그래프 모드
				viewMode = '2';
			} else if(subType == '774') {
				//그리드 + 그래프 모드
				viewMode = '3';
			}
			
			var reportUrl = 'mstrWeb?evt=4001&src=mstrWeb.4001&visMode=0&reportViewMode='+ viewMode +'&reportID='+ oid +'&Port=0&share=1' + mstrUrlInfo;
			var sectionUrl = '&hiddenSections=path,docktop,dockLeft';
			redirectUrl = reportUrl + sectionUrl;
			
			if(viewMode == '') {
				redirectUrl = '';
			}
			
		} else if(tp == "55") {
			//다큐먼트, 대시보드
			var sectionUrl = '&hiddenSections=header,footer,path,docktop,dockLeft';
			
			if(subType == 'false') {
				//다큐먼트
				var documentUrl = 'mstrWeb?evt=2048001&src=mstrWeb.2048001&visMode=0&documentID='+ oid +'&Port=0&share=1' + mstrUrlInfo;
				redirectUrl = documentUrl + sectionUrl;
			} else if(subType == 'true') {
				//대시보드
				var dashBoardUrl = 'mstrWeb?evt=3140&src=mstrWeb.3140&documentID='+ oid +'&Port=0&share=1' + mstrUrlInfo;
				redirectUrl = dashBoardUrl;
			}
			
			if(subType == '') {
				redirectUrl = '';
			}
			
		}
		
		if(redirectUrl != '') {
			window.location.replace('${pageContext.request.contextPath}/servlet/' + redirectUrl);
		}
	}
	
	
	$(function() {
		Init();
	});
</script>
</head>
<body>
</body>
</html>