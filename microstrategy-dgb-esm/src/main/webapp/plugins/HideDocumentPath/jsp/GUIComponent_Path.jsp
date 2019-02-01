<%
/*
 * GUIComponent_Path.jsp
 * Copyright 2001 MicroStrategy Incorporated. All rights reserved.
 */
%><%@ page errorPage="Error_Path.jsp"
%><%@ page contentType="text/html; charset=UTF-8"
%><%@ taglib uri="/webUtilTL.tld" prefix="web"
%>
<%-- Render the path links and info about the location of the object being transformed.--%>
<div class="mstrPathContainer">
<web:displayGuiComponent name="pathBean"/>
<%@include file='/jsp/Logo.jsp' %>
</div>

<!-- 
	mksong 수정 - 프롬프트 응답이 있는  다큐먼트 및 대시보드(프롬프트 선택 화면)
	커스터마이징 화면 Path 숨김 처리
 -->
<script src="${pageContext.request.contextPath}/_custom/javascript/jquery/jquery-1.11.0.js" type="text/javascript"></script>
<script type="text/javascript" >
	var customHomeCheck = typeof parent.defaultTreeDataJson;
	if(customHomeCheck == 'undefined') {
		//커스터마이징 화면	
		$('.mstrPathContainer').hide()
	}
</script>