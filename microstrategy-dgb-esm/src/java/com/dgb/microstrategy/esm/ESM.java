package com.dgb.microstrategy.esm;

import com.microstrategy.web.app.AbstractExternalSecurity;
import com.microstrategy.web.beans.RequestKeys;
import com.microstrategy.web.objects.WebIServerSession;
import com.microstrategy.web.platform.ContainerServices;

/**
 * ESM ���� - �� �ҽ��� ESM���� �����ϸ�, ����� �ĺ��� �ʿ��� ������ ���� �� ȣ��Ǹ�, 
 * ������ 'Administrator' ��������, 'MicroStrategy Tutorial' ������Ʈ ���� MSTR ���� ���� �����ϹǷ�, �� Override �޼��忡 ������ �����Ͻ� ���� �߰� 
 * @author Administrator
 *
 */
public class ESM extends AbstractExternalSecurity {
	/*
	 * MSTR ESM(External Security Module)�� ���� ����
	 * https://lw.microstrategy.com/msdz/MSDL/GARelease_Current/docs/projects/WebSDK/Content/topics/esm/Creating_a_Custom_External_Security_Module_ESM.htm
	 * ESM �ҽ� ����
	 * https://lw.microstrategy.com/msdz/MSDL/GARelease_Current/docs/projects/WebSDK/Content/topics/sso/SSO_SSOSample_ESMCodeExpl.htm
	 */
	
	/* 
	 * ����� ���������� �� �� �ִ� ��Ȳ(MSTR ������ ������ �� �ִ� �������� ��Ȳ�̸�) MSTR ���� ������ ���� USE_CUSTOM_LOGIN_PAGE ��ȯ,
	 * ����� �ĺ� �Ұ��ϸ� USE_CUSTOM_LOGIN_PAGE ��ȯ  
	 */
	@Override
    public int handlesAuthenticationRequest(final RequestKeys reqKeys, final ContainerServices cntSvcs, final int reason) {
		return COLLECT_SESSION_NOW;
    	//return USE_CUSTOM_LOGIN_PAGE;
    }

	/*
	 * USE_CUSTOM_LOGIN_PAGE�� ��쿡 �α��� ��θ� ��ȯ�ޱ� ���ؼ� ȣ���
	 */
	@Override
    public String getCustomLoginURL(final String originalURL, final String desiredServer, final int desiredPort, final String desiredProject) {
    	return "";
    }
	
	/* 
	 * MSTR ����� ������ ���� - ���� �����Ͻ� ���� ���� �ʿ�
	 * 
	 */
	@Override
    public WebIServerSession getWebIServerSession(final RequestKeys reqKeys, final ContainerServices cntSvcs) {
		WebIServerSession session = null;
		
		System.out.println("===> Create MSTR Session.");
		
		try {
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return session; 
    }
    
}
