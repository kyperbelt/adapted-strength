package com.terabite.authorization.accessingdatamysql;

import com.terabite.authorization.service.Member;
import org.springframework.data.repository.CrudRepository;

public interface MemberRepository extends CrudRepository<Member, Integer>
{
}
