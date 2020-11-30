package com.selectjun.todo.config.security.mapper;

import com.selectjun.todo.config.security.domain.CertificationAuthorityEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CertificationAuthorityMapper {

    /**
     * 회원 권한 조회(전체)
     * @param id    회원 구별 정보(아이디)
     * @return      회원 권한 전체 목록
     */
    public List<CertificationAuthorityEntity> getUserAuthorityList(@Param("id") String id);

    /**
     * 회원 권환 조회(권한명)
     * @param id    회원 구별 정보(아이디)
     * @return      권한 목록 권한명 목록
     */
    public List<String> getUserAuthority(@Param("id") String id);

}
