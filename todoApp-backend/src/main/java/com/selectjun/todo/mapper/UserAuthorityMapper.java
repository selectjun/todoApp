package com.selectjun.todo.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserAuthorityMapper {

    /**
     * 회원 권한 저장
     * @param id    회원 구별 정보(아이디)
     */
    public void save(String id);

}
